/*
StickyNote Class (Object Constructor)
-------------------------------------
1) has private variables via let-keyword id, message, createdDate, modifiedDate and deletedDate
2) a private method toString(): String representation of the class
3) return statement with public accessible properties and methods
*/
// StickyNote Class (Object Constructor)
function StickyNote() {
    let _id;
    let _message;

    let _createdDate;
    let _modifiedDate = null;
    let _deletedDate = null;
    
    function toString() {
        return _message;
    }

    return {
        get id() {
            return _id;
        },
        set id(value) {
            _id = value;
        }, 
        get message() {
            return _message;
        },
        set message(value) {
            _message = value;
        },
        get createdDate() {
            return _createdDate;
        },
        set createdDate(value) {
            _createdDate = value;
        },
        get modifiedDate() {
            return _modifiedDate;
        },
        set modifiedDate(value) {
            _modifiedDate = value;
        },
        get deletedDate() {
            return _deletedDate;
        },
        set deletedDate(value) {
            _deletedDate = value;
        },
        toString: toString 
    }
};