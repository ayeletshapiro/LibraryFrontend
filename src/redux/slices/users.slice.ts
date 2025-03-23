import { createSlice } from "@reduxjs/toolkit";
import { Book } from "../../models/book.models";
import { bookBorrow } from "../../models/bookBorrow.model";

const usersSlice = createSlice({
    initialState: {
        librarySubscribers: {//מילון שבו מאוחסנים התז של כל מנוי והספרים שהוא השאיל
            "214879330": [],//המילון מסוג בוקבורראו
            "216278788": [],
            "111111111": [],
            "222222222": [],
            "123456789": [],
        },
        message: null,//ההודעה
        color: null,//צבע ההודעה
        successAction: false
    },
    name: 'usersLibrary',
    reducers: {
        borrowBook: (state: any, action):void => {//שולחים גם את התז וגם את הספר 
            debugger
            if (action.payload.tz in state.librarySubscribers) {//אם קיים כזה מנוי
                state.librarySubscribers[action.payload.tz].push(new bookBorrow(action.payload.n, action.payload.a, action.payload.c))//מכניס לתוך המילון את הספר שהמנוי השאיל מסוג בוק בוררו
                state.successAction = true//בשביל שיוכל לעדכן במערך שהספר מושאל צריך לקבל אינדיקציה מפה לראות אם ההשאלה צלחה
                state.message = "הספר הושאל בהצלחה"
                state.color = "success"
            }
            else {//אם מגיע לפה זה אומר שהתז אינה מופיעה במערכת
                state.message = "התעודת זהות אינה מופיעה במערכת, אין אפשרות השאלה "
                state.color = "danger"
            }
        },
        returnBook: (state: any, action) :void=> {
            let indexBook:any
            if (action.payload.tz in state.librarySubscribers) {//אם קיים כזה מנוי
                let arr = state.librarySubscribers[action.payload.tz]
                for (let index = 0; index < arr.length; index++) {//עובר על המערך של הספרים של השואל
                    if (arr[index].name === action.payload.n && arr[index].author === action.payload.a && arr[index].category === action.payload.c) {
                        indexBook = index
                    }
                }
                state.librarySubscribers[action.payload.tz].splice(indexBook, indexBook + 1)//מוחק את הספר מהרשימה של המנוי
                state.successAction = true//מעדכן שהצליח
            }
            else {//אם מגיע לפה זה אומר שהתז אינה מופיעה במערכת
                state.message = "תעודת הזהות אינה מופיעה במערכת,ההחזרה לא בוצעה "
                state.color = "danger"
            }
        },
        setShowMessage: (state: any) => {
            state.message = null
            state.color = null
        },
        setSuccess: (state: any) => {
            state.successAction = null
        },
    }
})
export default usersSlice.reducer
export const { borrowBook, returnBook, setShowMessage, setSuccess } = usersSlice.actions;
