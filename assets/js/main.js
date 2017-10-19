function ready(cb) {
    /in/.test(document.readyState)
    ? setTimeout(ready.bind(null, cb), 90)
    : cb();
};

ready(function(){

    var App = {
        "init": function() {
            this._applicationDbContext = ApplicationDbContext; // Reference to the ApplicationDbContext object
            this._applicationDbContext.init('ahs.nmd.stickynotes'); // Intialize the ApplicationDbContext with the connection string as parameter value
            this.listAllStickyNotes();

            // Get the button's dom element and add an eventlistener.
            const createBtn = document.getElementById("createStickyNote")
            createBtn.addEventListener("click", this.createNewStickyNote);
            document.addEventListener('keydown', function(e){
                if (e.keyCode == 13){
                    this.createNewStickyNote;
                }
            });
        },

        //
        // List all  sticky notes //
        //

        "listAllStickyNotes": function() {
            let stickyNotes = this._applicationDbContext.getStickyNotes();
            let stickyNotesHtml = "";
            const cardColumsElement = document.getElementById("notes-container");

            if (stickyNotes != null) {

                stickyNotes.forEach(function (element) {
                    
                    let tempStr = "";
                    let id = element.id;
                    let message = element.message;
                    let createdDate = formatDate(element.createdDate);
                    let modifiedDate = formatDate(element.modifiedDate);
                    let deletedDate = element.deletedDate;
                    if (deletedDate == null) {
                        var customClass = "bg-light";
                        var links = `
                        <a href="#" class="card-link" data-id="${id}" data-type="edit">Edit</a>
                        <a href="#" class="card-link" data-id="${id}" data-type="softdelete">Delete</a>
                        `;
                    } else { 
                        var customClass = "bg-danger";
                        var links = `
                        <a href="#" class="card-link" data-id="${id}" data-type="undelete">Undelete</a>
                        <a href="#" class="card-link" data-id="${id}" data-type="delete">Delete Permanently</a>
                        `;
                    }

                    tempStr = 
                    `
                    <div class="card ${customClass}">
                        <div class="card-body">
                            <p class="card-text">${message}</p>
                            ${links}
                        </div>
                        <ul class="list-group list-group-flush">
                            <li class="list-group-item">id: ${id}</li>
                            <li class="list-group-item">created: ${createdDate}</li>
                            <li class="list-group-item">modified: ${modifiedDate}</li>
                        </ul>
                    </div> 
                    `

                    stickyNotesHtml += tempStr;
                }, this);

                cardColumsElement.innerHTML = stickyNotesHtml;

                // Event listeners for links

                var softDeleteLinks = document.querySelectorAll("[data-type='softdelete']");
                var unDeleteLinks = document.querySelectorAll("[data-type='undelete']");
                var deleteLinks = document.querySelectorAll("[data-type='delete']");
                var editLinks = document.querySelectorAll("[data-type='edit']");

                
                    for (var i = 0; i < softDeleteLinks.length; i++) {
                        softDeleteLinks[i].addEventListener('click', function() {
                            let id = parseInt(this.getAttribute("data-id"));
                            ApplicationDbContext.softDeleteStickyNoteById(id);
                            App.listAllStickyNotes();
        
                        });

                        editLinks[i].addEventListener('click', function() {
                            let id = parseInt(this.getAttribute("data-id"));
                            const noteToEdit = ApplicationDbContext.getStickyNoteById(id);
                            let newMessage = prompt("Edit your sticky note:", noteToEdit.message);
                            if (newMessage != null) {
                                noteToEdit.message = newMessage;
                                ApplicationDbContext.updateStickyNote(noteToEdit);
                                App.listAllStickyNotes();
                            }
                        });
                    }

                    for (var i = 0; i < unDeleteLinks.length; i++) {
                        unDeleteLinks[i].addEventListener('click', function() {
                            let id = parseInt(this.getAttribute("data-id"));
                            ApplicationDbContext.softUnDeleteStickyNoteById(id);
                            App.listAllStickyNotes();
                        });

                        deleteLinks[i].addEventListener('click', function() {
                            let id = parseInt(this.getAttribute("data-id"));
                            ApplicationDbContext.deleteStickyNoteById(id);
                            App.listAllStickyNotes();
        
                        });
                    }

            } else {

                cardColumsElement.innerHTML = "You did not create any sticky notes yet.";

            }

        },

        //
        // Add new sticky note //
        //

        "createNewStickyNote": function() {

            let value = document.getElementById("stickyNoteValue").value;
            if (value === "" || value === null) {
                window.alert("The sticky note is empty or invalid.")
            }
            else {
                let newStickyNote = new StickyNote();
                newStickyNote.message = value;
                ApplicationDbContext.addStickyNote(newStickyNote);
                App.listAllStickyNotes();
            }
        },

        // "testApplicationDbContext": function() {
        //     // 1. Get all sticky notes
        //     let data = this._applicationDbContext.getStickyNotes();
        //     console.log(data);
        //     // 2. Create a new sticky note
        //     let sn = new StickyNote();
        //     sn.message = 'Pak cola zero voor mezelf.';
        //     sn = this._applicationDbContext.addStickyNote(sn); // add to db and save it
        //     // 3. Get allesticky notes
        //     data = this._applicationDbContext.getStickyNotes();
        //     console.log(data);
        //     // 4. Get sticky note by id
        //     sn = this._applicationDbContext.getStickyNoteById(2306155430445);
        //     console.log(sn);
        //     // 5. Delete sticky note by id
        //     const deleted = this._applicationDbContext.deleteStickyNoteById(2306155430445);
        //     console.log(deleted);
        //     // 6. Soft Delete sticky note with id: 1551637732407
        //     //const softDeleted = this._applicationDbContext.softDeleteStickyNoteById(1551637732407);
        //     //console.log(softDeleted);
        //     //sn = this._applicationDbContext.getStickyNoteById(1551637732407);
        //     //console.log(sn);
        //     // 6. Soft Delete sticky note with id: 1551637732407
        //     const softUnDeleted = this._applicationDbContext.softUnDeleteStickyNoteById(1551637732407);
        //     console.log(softUnDeleted);
        //     sn = this._applicationDbContext.getStickyNoteById(1551637732407);
        //     console.log(sn);
        //     // Update sticky note with id: 1902577181167
        //     sn = this._applicationDbContext.getStickyNoteById(1902577181167);
        //     console.log(sn);
        //     sn.message = 'ik heb zin in een zwarte kat (koffie)...';
        //     const updated = this._applicationDbContext.updateStickyNote(1902577181167);
        //     console.log(updated);
        //     sn = this._applicationDbContext.getStickyNoteById(1902577181167);
        //     console.log(sn);
        // }
    };

    App.init(); // Initialize the application
});