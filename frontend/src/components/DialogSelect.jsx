import * as React from 'react'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Dialog from '@mui/material/Dialog'
import DialogActions from '@mui/material/DialogActions'
import DialogContent from '@mui/material/DialogContent'
import DialogTitle from '@mui/material/DialogTitle'
import InputLabel from '@mui/material/InputLabel'
import OutlinedInput from '@mui/material/OutlinedInput'
import MenuItem from '@mui/material/MenuItem'
import FormControl from '@mui/material/FormControl'
import Select from '@mui/material/Select'
import { useTheme } from '@mui/material/styles'

const DialogSelect = ({
  title,
  field,
  selected,
  item,
  setItem,
  open,
  setOpen,
  onSubmit,
  handleSuccess,
}) => {
  const [value, setValue] = React.useState(item[field.name])
  const theme = useTheme()

  function getButtonStyles(theme) {
    return {
      color: theme.palette.text.primary,
      whiteSpace: 'nowrap',
      '&:hover': {
        color: theme.palette.text.secondary,
      },
      '& .MuiButton-startIcon': {
        color: theme.palette.text.primary,
      },
      '&:hover .MuiButton-startIcon': {
        color: theme.palette.text.secondary,
      },
    }
  }

  function getContainedButtonStyles(theme) {
    return {
      color: theme.palette.text.primary,
      '&:hover': {
        color: theme.palette.text.secondary,
      },
      '& .MuiButton-startIcon': {
        color: theme.palette.text.primary,
      },
      '&:hover .MuiButton-startIcon': {
        color: theme.palette.text.secondary,
      },
    }
  }

  const handleChange = (event) => {
    setValue(event.target.value || '')
    item[field.name] = event.target.value
    setItem(item)
  }

  const handleClose = (event, reason) => {
    if (reason !== 'backdropClick') {
      setOpen(false)
    }
  }

  const handleSubmit = (event) => {
    event.preventDefault()
    onSubmit(item._id, value)
    handleSuccess()
    setOpen(false)
  }

  return (
    <div>
      <Dialog disableEscapeKeyDown open={open} onClose={handleClose}>
        <DialogTitle>{title}</DialogTitle>
        <DialogContent>
          <Box component="form" sx={{ display: 'flex', flexWrap: 'wrap' }}>
            <FormControl sx={{ m: 1, minWidth: 400 }}>
              <InputLabel htmlFor="demo-dialog-native">
                {field.label}
              </InputLabel>
              <Select
                native
                value={selected[0][field.name]}
                onChange={handleChange}
                input={
                  <OutlinedInput label={field.label} id="demo-dialog-native" />
                }
              >
                {field.values.map((value) => (
                  <option key={value} value={value}>
                    {value}
                  </option>
                ))}
              </Select>
            </FormControl>
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} sx={getButtonStyles(theme)}>
            Annuler
          </Button>
          <Button onClick={handleSubmit} sx={getContainedButtonStyles(theme)}>
            Mettre à jour
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  )
}

export default DialogSelect
