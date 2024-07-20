import {useState} from "react"

export default function useFormUser(submitHandler, initialValues) {

    const [values, setValues] = useState(initialValues)
    const [errors, setErrors] = useState({})
    const isValid = values.email !== '' && values.password !== '' && values.password.length >= 6

    const validateField = (name, value) => {
        let error = ""

        if (name === "email") {
            if (!value) {
                error = "Email is required!"
            } else if (!/^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/.test(value)) {
                error = "Email is not valid!"
            }
        }

        if (name === "password") {
            if (!value) {
                error = "Password is required!"
            } else if (value.length < 6) {
                error = "Password must be at least 6 characters!"
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
