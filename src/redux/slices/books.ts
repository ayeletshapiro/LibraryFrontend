import { createSlice } from "@reduxjs/toolkit";
import { Book } from "../../models/book.models";
import { category } from "../../enums/categoryEnum";
import { bookBorrow } from "../../models/bookBorrow.model";
import dataService from "../../service/data.service";
const arrayBooks = createSlice({
    initialState: {
        arr: [new Book("יוזבד", "מיה קינן", category.adults),
        new Book("בנצי", "שרה ליאון", category.children), new Book("דודי ואודי", "שרה ליאון", category.comics), new Book("תהילים", "דוד המלך", category.holy),
        new Book("שקיעת החושך", "תהילה נבוא", category.adults), new Book("אריה הספריה", "מישל קנודסן", category.children),
        new Book("שמלת השבת של דינה די", "שרה קיסנר", category.children), new Book("קל לבשל", "אפשרת ברזל", category.cooking),
        new Book("שלנו את סרינה", "רותי קפלר", category.adults), new Book("סבתא שמחה", "יפה גנז", category.adults),
        new Book("טווח אפס", "יונה ספיר", category.adults), new Book("אפשר לתקן", "הרב שלמה הופמן", category.holy),
        new Book("מבוקש", "יונה ספיר", category.adults), new Book("נחמנשר", "נחמי שפירו", category.children),
        new Book("אויב באדמת ידיד", "יונה ספיר", category.adults), new Book("מסומן", "מיכל שפירו", category.adults),
        new Book("ידידיה", "נחמי שפירו", category.adults), new Book("נידונה לכישלון", "בתיה ענה", category.adults),
        new Book("הרשת", "נחמן סלצר", category.adults), new Book("מחוקים", "מיכל בוני", category.adults),
        new Book("הצללים", "נחמן סלצר", category.adults), new Book("עולם נפלא", "מיכל בוני", category.adults),
        new Book("חלונות אור 5", "שרה ליאון", category.children),
        new Book("חומש במדבר", "הוצאת יפה נוף", category.holy), new Book("נפלאות הבישול", "מירי זורגר", category.cooking),
        ],  
        message: null,//ההודעה
        color: null,//צבע ההודעה
        librarySubscribers: {//מילון שבו מאוחסנים התז של כל מנוי והספרים שהוא השאיל
            "214879330": [],//המילון מסוג בוקבורראו
            "216278788": [],
            "111111111": [],
            "222222222": [],
            "123456789": [],
        },
        successAction: false,

    },
    name: 'arrBooks',
    reducers: {
        
        addBook: (state: any, action) => {
            debugger
            console.log("starting the addBook in the store");
            for (let index = 0; index < state.arr.length; index++) {
                
                if (state.arr[index].name === action.payload.n && state.arr[index].author === action.payload.a) {
                    state.message = 'קיים ספר בעל שם וסופרת זהים אין אפשרות להכניסו'
                    state.color = 'danger'
                    return;
                }
            }
            state.arr.push(new Book(action.payload.n, action.payload.a, action.payload.c))
            state.message = "!הספר נכנס למאגר בהצלחה"
            state.color = 'success'
        },
        deleteBook: (state: any, action) => {
            for (let index = 0; index < state.arr.length; index++) {
                if (state.arr[index].name === action.payload.n && state.arr[index].author === action.payload.a) {
                    state.arr.splice(index, index + 1)
                    state.message = "!הספר נמחק בהצלחה"
                    state.color = 'success'
                
                    return;
                }
            }
            state.message = "הספר לא קיים במאגר ולכן פעולת המחיקה נכשלה"
            state.color = 'danger'
        },
        setShowMessage: (state: any) => {
            state.message = null
            state.color = null
        },
        updateBorrow: (state: any, action) => {
            state.arr[action.payload.index] = action.payload.bool
        },
        borrowBook: (state1: any, action): void => {//שולחים גם את התז וגם את הספר 
            if (action.payload.tz in state1.librarySubscribers) {//אם קיים כזה מנוי
                state1.librarySubscribers[action.payload.tz].push(new bookBorrow(action.payload.n, action.payload.a, action.payload.c))//מכניס לתוך המילון את הספר שהמנוי השאיל מסוג בוק בוררו
                state1.successAction = true//בשביל שיוכל לעדכן במערך שהספר מושאל צריך לקבל אינדיקציה מפה לראות אם ההשאלה צלחה
                state1.arr[(action.payload.index)].isBorrowed = true
                state1.arr[(action.payload.index)] = { ...state1.arr[(action.payload.index)] }
                state1.message = "הספר הושאל בהצלחה"
                state1.color = "success"
                state1.successAction = false
            }
            else {//אם מגיע לפה זה אומר שהתז אינה מופיעה במערכת
                state1.message = "קוד  הזיהוי אינו מופיע במערכת, אין אפשרות השאלה "
                state1.color = "danger"
            }
        },
        returnBook: (state: any, action): void => {
            let indexBook = -1
            if (action.payload.tz in state.librarySubscribers) {//אם קיים כזה מנוי
                let arr = state.librarySubscribers[action.payload.tz]
                for (let index = 0; index < arr.length; index++) {//עובר על המערך של הספרים של השואל
                    if (arr[index].name === action.payload.n && arr[index].author === action.payload.a && arr[index].category === action.payload.c) {
                        indexBook = index
                    }
                }
                if (indexBook == -1)//book not found in the subscriber array books
                {
                    state.message = "המשתמש שהוזן לא השאיל ספר זה"
                    state.color = "danger"
                    return;
                }
                state.librarySubscribers[action.payload.tz].splice(indexBook, indexBook + 1)//מוחק את הספר מהרשימה של המנוי
                state.successAction = true//מעדכן שהצליח
                state.arr[(action.payload.index)].isBorrowed = false
                state.arr[(action.payload.index)] = { ...state.arr[(action.payload.index)] }
                state.message = "הספר הוחזר בהצלחה"
                state.color = "success"
            }
            else {//אם מגיע לפה זה אומר שהתז אינה מופיעה במערכת
                state.message = "קוד הזיהוי אינו מופיע במערכת,ההחזרה לא בוצעה "
                state.color = "danger"
            }
        },
        setSuccess: (state: any) => {
            state.successAction = null
        },
    }
})
export default arrayBooks.reducer
export const { addBook, setShowMessage, deleteBook, updateBorrow, setSuccess, returnBook, borrowBook } = arrayBooks.actions;
