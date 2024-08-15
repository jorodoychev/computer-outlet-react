import {useState} from "react"

export default function useForm(submitHandler, initialValues, validate) {
    const [values, setValues] = useState(initialValues)
    const [errors, setErrors] = useState({})
    const isValid = Object.values(errors).every(error => !error)

    // useEffect(() => {
    //     setValues(prevValues => !shallowEqual(prevValues, initialValues) ? initialValues : prevValues)
    // }, [initialValues])
    //
    // function shallowEqual(obj1, obj2) {
    //     if (obj1 === obj2) return true
    //     if (typeof obj1 !== 'object' || typeof obj2 !== 'object') return false
    //
    //     const keys1 = Object.keys(obj1)
    //     const keys2 = Object.keys(obj2)
    //
    //     if (keys1.length !== keys2.length) return false
    //
    //     for (let key of keys1) {
    //         if (obj1[key] !== obj2[key]) return false
    //     }
    //
    //     return true
    // }

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
