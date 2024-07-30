const validator = {
    title: (value) => {
        if (!value) return "Title is required!"
        if (value.length < 5) return "Title must be at least 5 characters!"
        return ""
    },
    imgUrl: (value) => {
        if (!value) return "imgUrl is required!"
        if (!/^https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)\.(?:jpeg|jpg|gif|png)$/.test(value)) {
            return "imgUrl is not valid!"
        }
    },
    description: (value) => {
        if (!value) return "Description is required!"
        if (value.length < 10) return "Description must be at least 10 characters!"
        return ""
    },
    price: (value) => {
        if (!value) return "Price is required!"
        if (!value.match(/^[0-9]+$/)) {
            return "Price must be a number!"
        }
        if (value.length < 1) {
            return "Price must be at least one digit long!"
        }

    },
    comment: (value) => {
        if (!value) return "Comment is required!"
        if (value.length < 10) return "Comment must be at least 10 characters!"
        return ""
    },
    username: (value) => {
        if (!value) return "Username is required!"
        if (value.length < 5) return "Username must be at least 5 characters!"
        return ""
    },
    email: (value) => {
        if (!value) return "Email is required!"
        if (!/^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/.test(value)) return "Email is not valid!"
        return ""
    },
    password: (value) => {
        if (!value) return "Password is required!"
        if (value.length < 6) return "Password must be at least 6 characters!"
        return ""
    },
    confirmPassword: (value, values) => {
        if (!value) return "Repeat password is required!"
        if (value.length < 6) return "Password must be at least 6 characters!"
        if (value !== values.password) return "Passwords do not match!"
        return ""
    },
}

export default validator
