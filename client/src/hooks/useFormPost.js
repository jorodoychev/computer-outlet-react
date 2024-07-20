import {useState} from "react"

export default function useFormPost(submitHandler, initialValues) {

    const [values, setValues] = useState(initialValues)
    const [errors, setErrors] = useState({})
    const isValid = values.title !== '' && values.imgUrl !== '' && values.description !== '' && values.price !== '' && values.price >= 0

    const validateField = (name, value) => {
        let error = ""

        if (name === "title") {
            if (!value) {
                error = "Title is required!"
            } else if (value.length < 5) {
                error = "Title must be at least 5 characters!"
            }
        }

        if (name === "imgUrl") {
            if (!value) {
                error = "imgUrl is required!"
            } else if (!/^(https?:\/\/)?(([\da-z\.-]+)\.([a-z\.]{2,6})|([0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}))([\w\-]*)*\/?$/.test(value)) {
                error = "imgUrl is not valid!"
            }

        }

        if (name === "description") {
            if (!value) {
                error = "Description is required!"
            } else if (value.length < 10) {
                error = "Description must be at least 10 characters!"
            }
        }

        if (name === "price") {
            if (!value) {
                error = "Price is required!"
            } else if (!value.match(/^[0-9]+$/)) {
                error = "Price must be a number!"
            } else if (value.length < 1) {
                error = "Price must be at least one digit long!"
            }
        }

        return error
    }

    const onChange = (e) => {
        const {name, value} = e.target
        setValues(values => ({
            ...values,
            [name]: value
        }))
        setErrors(errors => ({
            ...errors,
            [name]: ""
        }))
    }

    const onBlur = (e) => {
        const {name, value} = e.target
        const error = validateField(name, value)
        setErrors(errors => ({
            ...errors,
            [name]: error
        }))
    }

    const onSubmit = (e) => {
        e.preventDefault()
        if (Object.values(errors).every(error => !error)) {
            submitHandler(values)
        }
    }

    return {
        values,
        errors,
        isValid,
        onChange,
        onBlur,
        onSubmit,
    }
}


























