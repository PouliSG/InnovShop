import * as React from 'react'
import PropTypes from 'prop-types'
import { useNavigate, useLocation } from 'react-router-dom'
import { alpha } from '@mui/material/styles'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import CardMedia from '@mui/material/CardMedia'
import Modal from '@mui/material/Modal'
import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import TableHead from '@mui/material/TableHead'
import TablePagination from '@mui/material/TablePagination'
import TableRow from '@mui/material/TableRow'
import TableSortLabel from '@mui/material/TableSortLabel'
import Toolbar from '@mui/material/Toolbar'
import Typography from '@mui/material/Typography'
import Paper from '@mui/material/Paper'
import Checkbox from '@mui/material/Checkbox'
import IconButton from '@mui/material/IconButton'
import Tooltip from '@mui/material/Tooltip'
import FormControlLabel from '@mui/material/FormControlLabel'
import Switch from '@mui/material/Switch'
import DeleteIcon from '@mui/icons-material/Delete'
import FilterListIcon from '@mui/icons-material/FilterList'
import AddIcon from '@mui/icons-material/Add'
import EditIcon from '@mui/icons-material/Edit'
import { visuallyHidden } from '@mui/utils'
import { useTheme } from '@mui/material/styles'

function descendingComparator(a, b, orderBy) {
  if (b[orderBy] < a[orderBy]) {
    return -1
  }
  if (b[orderBy] > a[orderBy]) {
    return 1
  }
  return 0
}

function getComparator(order, orderBy) {
  return order === 'desc'
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy)
}

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
    color: theme.palette.text.third,
    whiteSpace: 'nowrap',
    minWidth: '170px',
    'font-size': '0.7rem',
    '&:hover': {
      color: theme.palette.text.secondary,
    },
    '& .MuiButton-startIcon': {
      color: theme.palette.text.third,
    },
    '&:hover .MuiButton-startIcon': {
      color: theme.palette.text.secondary,
    },
  }
}

function getIconButtonStyles(theme) {
  return {
    color: theme.palette.text.primary.main,
    '&:hover': {
      color: theme.palette.text.secondary,
    },
    borderRadius: theme.shape.borderRadius,
  }
}

function EnhancedTableHead(props) {
  const {
    headCells,
    onSelectAllClick,
    order,
    orderBy,
    numSelected,
    rowCount,
    onRequestSort,
  } = props
  const createSortHandler = (property) => (event) => {
    onRequestSort(event, property)
  }

  return (
    <TableHead>
      <TableRow>
        <TableCell padding="checkbox">
          <Checkbox
            color="primary"
            indeterminate={numSelected > 0 && numSelected < rowCount}
            checked={rowCount > 0 && numSelected === rowCount}
            onChange={onSelectAllClick}
            inputProps={{
              'aria-label': 'Séléctionner toutes les lignes',
            }}
          />
        </TableCell>
        {headCells.map((headCell) => (
          <TableCell
            key={headCell.id}
            align={headCell.numeric ? 'right' : 'left'}
            padding={headCell.disablePadding ? 'none' : 'normal'}
            sortDirection={orderBy === headCell.id ? order : false}
          >
            <TableSortLabel
              active={orderBy === headCell.id}
              direction={orderBy === headCell.id ? order : 'asc'}
              onClick={createSortHandler(headCell.id)}
            >
              {headCell.label}
              {orderBy === headCell.id ? (
                <Box component="span" sx={visuallyHidden}>
                  {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
                </Box>
              ) : null}
            </TableSortLabel>
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  )
}

EnhancedTableHead.propTypes = {
  headCells: PropTypes.array.isRequired,
  numSelected: PropTypes.number.isRequired,
  onRequestSort: PropTypes.func.isRequired,
  onSelectAllClick: PropTypes.func.isRequired,
  order: PropTypes.oneOf(['asc', 'desc']).isRequired,
  orderBy: PropTypes.string.isRequired,
  rowCount: PropTypes.number.isRequired,
}

function EnhancedTableToolbar(props) {
  const {
    numSelected,
    title,
    handleDeleteConfirmOpen,
    handleAdd,
    handleEdit,
    handleUpdateStatus,
    handleUpdatePayment,
    handlePromote,
    handleSetActive,
    handleSetVerified,
  } = props
  const theme = useTheme()
  return (
    <Toolbar
      sx={[
        {
          pl: { sm: 2 },
          pr: { xs: 1, sm: 1 },
        },
        numSelected > 0 && {
          bgcolor: (theme) =>
            alpha(
              theme.palette.primary.main,
              theme.palette.action.activatedOpacity
            ),
        },
      ]}
    >
      <Box sx={{ flex: '1 1 100%' }}>
        <Typography
          sx={{ flex: '1 1 100%' }}
          variant="h6"
          id="tableTitle"
          component="div"
        >
          {title}
        </Typography>
        {numSelected > 0 && (
          <Typography
            sx={{ flex: '1 1 100%' }}
            color="inherit"
            variant="subtitle1"
            component="div"
          >
            {numSelected} sélectionné(s)
          </Typography>
        )}
      </Box>
      <Tooltip title="Ajouter">
        <IconButton onClick={handleAdd} sx={getIconButtonStyles(theme)}>
          <AddIcon />
        </IconButton>
      </Tooltip>
      {numSelected > 0 ? (
        <>
          <Tooltip title="Modifier">
            <IconButton onClick={handleEdit} sx={getIconButtonStyles(theme)}>
              <EditIcon />
            </IconButton>
          </Tooltip>
          <Tooltip title="Supprimer">
            <IconButton
              onClick={() => handleDeleteConfirmOpen()}
              sx={getIconButtonStyles(theme)}
            >
              <DeleteIcon />
            </IconButton>
          </Tooltip>
        </>
      ) : (
        <Tooltip title="Filtres">
          <IconButton sx={getIconButtonStyles(theme)}>
            <FilterListIcon />
          </IconButton>
        </Tooltip>
      )}
    </Toolbar>
  )
}

EnhancedTableToolbar.propTypes = {
  numSelected: PropTypes.number.isRequired,
  title: PropTypes.string.isRequired,
  handleDeleteConfirmOpen: PropTypes.func,
  handleAdd: PropTypes.func,
  handleEdit: PropTypes.func,
  handleUpdateStatus: PropTypes.func,
  handleUpdatePayment: PropTypes.func,
  handlePromote: PropTypes.func,
  handleSetActive: PropTypes.func,
  handleSetVerified: PropTypes.func,
}

EnhancedTable.propTypes = {
  title: PropTypes.string.isRequired,
  headCells: PropTypes.array.isRequired,
  rows: PropTypes.array.isRequired,
  handleDelete: PropTypes.func,
  onSuccess: PropTypes.func,
  handleUpdateStatus: PropTypes.func,
  handleUpdatePayment: PropTypes.func,
  handlePromote: PropTypes.func,
  handleSetActive: PropTypes.func,
  handleSetVerified: PropTypes.func,
}

export default function EnhancedTable(props) {
  const {
    title,
    headCells,
    rows,
    handleDelete,
    onSuccess,
    handleUpdateStatus,
    handleUpdatePayment,
    handlePromote,
    handleSetActive,
    handleSetVerified,
  } = props
  const [order, setOrder] = React.useState('desc')
  const [orderBy, setOrderBy] = React.useState('createdAt')
  const [selected, setSelected] = React.useState([])
  const [page, setPage] = React.useState(0)
  const [dense, setDense] = React.useState(true)
  const [rowsPerPage, setRowsPerPage] = React.useState(10)
  const [isDeleteConfirmOpen, setDeleteConfirmOpen] = React.useState(false)

  const handleDeleteConfirmOpen = () => setDeleteConfirmOpen(true)
  const handleDeleteConfirmClose = () => setDeleteConfirmOpen(false)

  const handleConfirmDelete = () => {
    handleDelete(selected)
    handleDeleteConfirmClose()
  }

  const navigate = useNavigate()
  const location = useLocation()

  const handleAdd = () => {
    navigate(location.pathname + '/add')
  }

  const handleEdit = () => {
    if (selected.length === 1) {
      navigate(`${location.pathname}/edit/${selected[0]}`)
    } else {
      // Gérer le cas où plusieurs éléments sont sélectionnés ou aucun
      alert('Veuillez sélectionner un seul produit à éditer.')
    }
  }

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === 'asc'
    setOrder(isAsc ? 'desc' : 'asc')
    setOrderBy(property)
  }

  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelected = rows.map((n) => n._id)
      setSelected(newSelected)
      return
    }
    setSelected([])
  }

  const handleClick = (event, id) => {
    const selectedIndex = selected.indexOf(id)
    let newSelected = []

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, id)
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1))
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1))
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1)
      )
    }
    setSelected(newSelected)
  }

  const handleChangePage = (event, newPage) => {
    setPage(newPage)
  }

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10))
    setPage(0)
  }

  const handleChangeDense = (event) => {
    setDense(event.target.checked)
  }

  // Avoid a layout jump when reaching the last page with empty rows.
  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - rows.length) : 0

  const visibleRows = React.useMemo(
    () =>
      [...rows]
        .sort(getComparator(order, orderBy))
        .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage),
    [rows, order, orderBy, page, rowsPerPage]
  )

  return (
    <>
      <Box sx={{ width: '100%' }}>
        <Paper sx={{ width: '100%', mb: 2 }}>
          <EnhancedTableToolbar
            numSelected={selected.length}
            title={title}
            handleDeleteConfirmOpen={handleDeleteConfirmOpen}
            handleAdd={handleAdd}
            handleEdit={handleEdit}
            handleUpdateStatus={handleUpdateStatus}
            handleUpdatePayment={handleUpdatePayment}
            handlePromote={handlePromote}
            handleSetActive={handleSetActive}
            handleSetVerified={handleSetVerified}
          />
          <TableContainer sx={{ maxHeight: 600 }}>
            <Table
              sx={{ minWidth: 750 }}
              aria-labelledby="tableTitle"
              size={dense ? 'small' : 'medium'}
            >
              <EnhancedTableHead
                headCells={headCells}
                numSelected={selected.length}
                order={order}
                orderBy={orderBy}
                onSelectAllClick={handleSelectAllClick}
                onRequestSort={handleRequestSort}
                rowCount={rows.length}
              />
              <TableBody>
                {visibleRows.map((row, index) => {
                  const isItemSelected = selected.includes(row._id)
                  const labelId = `enhanced-table-checkbox-${index}`

                  return (
                    <TableRow
                      hover
                      onClick={(event) => handleClick(event, row._id)}
                      role="checkbox"
                      aria-checked={isItemSelected}
                      tabIndex={-1}
                      key={row._id}
                      selected={isItemSelected}
                      sx={{ cursor: 'pointer' }}
                    >
                      <TableCell padding="checkbox">
                        <Checkbox
                          color="primary"
                          checked={isItemSelected}
                          inputProps={{
                            'aria-labelledby': labelId,
                          }}
                        />
                      </TableCell>
                      {headCells.map((cell, index) =>
                        index <= headCells.length / 2 ? (
                          <TableCell
                            key={cell.id}
                            component="th"
                            id={labelId}
                            scope="row"
                            padding="normal"
                            sx={{
                              maxWidth: '200px',
                              whiteSpace: 'nowrap',
                              overflow: 'hidden',
                              textOverflow: 'ellipsis',
                            }}
                          >
                            {cell.id === 'image' ? (
                              <CardMedia
                                component="img"
                                height="80"
                                image={row[cell.id]}
                                alt={row.name}
                              />
                            ) : typeof row[cell.id] === 'object' ? (
                              (cell.value(row[cell.id]) || '').toLocaleString(
                                'fr-FR'
                              )
                            ) : (
                              row[cell.id]
                            )}
                          </TableCell>
                        ) : (
                          <TableCell
                            align="right"
                            key={cell.id}
                            sx={{
                              maxWidth: '100px',
                              whiteSpace: 'nowrap',
                              overflow: 'hidden',
                              textOverflow: 'ellipsis',
                            }}
                          >
                            {typeof row[cell.id] === 'object'
                              ? (cell.value(row[cell.id]) || '').toLocaleString(
                                  'fr-FR'
                                )
                              : (row[cell.id] || '').toLocaleString('fr-FR')}
                          </TableCell>
                        )
                      )}
                    </TableRow>
                  )
                })}
                {emptyRows > 0 && (
                  <TableRow
                    style={{
                      height: (dense ? 33 : 53) * emptyRows,
                    }}
                  >
                    <TableCell colSpan={6} />
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </TableContainer>
          <TablePagination
            rowsPerPageOptions={[
              5,
              10,
              25,
              { value: -1, label: 'Toutes/Tous' },
            ]}
            component="div"
            count={rows.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
            sx={{ alignItems: 'center' }}
          />
        </Paper>
        <FormControlLabel
          control={<Switch checked={dense} onChange={handleChangeDense} />}
          label="Condensé"
        />
      </Box>

      <Modal open={isDeleteConfirmOpen} onClose={handleDeleteConfirmClose}>
        <Box
          sx={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            bgcolor: 'background.paper',
            border: '2px solid #000',
            boxShadow: 24,
            p: 4,
            width: 400, // Width of the modal
            textAlign: 'center', // Center the text
          }}
        >
          <Typography variant="h6" component="h2">
            Confirmer la suppression
          </Typography>
          <Typography sx={{ mt: 2 }}>
            Êtes-vous sûr de vouloir supprimer{' '}
            {selected.length > 1
              ? `les ${selected.length} éléments sélectionnés ?`
              : "l'élément sélectionné ?"}
          </Typography>
          <Box
            sx={{
              mt: 4,
              display: 'flex',
              justifyContent: 'space-around',
            }}
          >
            <Button
              variant="contained"
              color="primary"
              onClick={handleConfirmDelete}
            >
              Oui
            </Button>
            <Button variant="outlined" onClick={handleDeleteConfirmClose}>
              Annuler
            </Button>
          </Box>
        </Box>
      </Modal>
    </>
  )
}
