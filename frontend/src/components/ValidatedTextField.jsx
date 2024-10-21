import React, { useState } from 'react'
import { TextField } from '@mui/material'

function ValidatedTextField({
  name,
  label,
  value,
  onChange,
  onBlur,
  required,
  validation,
  errorMessage,
  type = 'text',
  inputProps,
  ...props
}) {
  const [error, setError] = useState('')

  const handleBlur = (e) => {
    if (required && !value) {
      setError('Ce champ est requis.')
    } else if (validation && value && !validation.test(value)) {
      setError(errorMessage)
    } else {
      if (
        name === 'password' &&
        (value.length < 8 ||
          value.length > 20 ||
          !/\d/.test(value) ||
          !/[a-z]/.test(value) ||
          !/[A-Z]/.test(value) ||
          !/[^a-zA-Z0-9]/.test(value))
      ) {
        setError(
          'Le mot de passe doit contenir entre 8 et 20 caractères, au moins un chiffre, une lettre minuscule, une lettre majuscule et un caractère spécial.'
        )
      } else {
        setError('')
      }
    }
    if (onBlur) onBlur(e)
  }

  return (
    <TextField
      name={name}
      label={label}
      value={value}
      onChange={(e) => {
        setError('')
        onChange(e)
      }}
      onBlur={handleBlur}
      error={!!error}
      helperText={error}
      required={required}
      type={type}
      slotProps={{ input: inputProps }}
      {...props}
    />
  )
}

export default ValidatedTextField
