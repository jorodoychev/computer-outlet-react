import {useState} from "react"

export default function useForm(submitHandler, initialValues, validate) {
    const [values, setValues] = useState(initialValues)
    const [errors, setErrors] = useState({})
    const isValid = Object.values(errors).every(error => !error)

    const onChange = (e) => {
        const {name, value} = e.target
        setValues(values => ({
            ...values,
            [name]: value
        }))

        if (errors[name]) {
            setErrors(errors => ({
                ...errors,
                [name]: validate[name](value, values)
            }))
        }
    }

    const onBlur = (e) => {
        const {name, value} = e.target
        const error = validate[name](value, values)
        setErrors(errors => ({
            ...errors,
            [name]: error
        }))
    }

    const onSubmit = (e) => {
        e.preventDefault()
        const newErrors = {}
        let valid = true

        for (const name in values) {
            const error = validate[name](values[name], values)
            if (error) {
                valid = false
            }
            newErrors[name] = error
        }

        setErrors(newErrors)

        if (valid) {
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
