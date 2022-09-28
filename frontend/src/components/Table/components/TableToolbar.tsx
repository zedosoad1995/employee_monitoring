import Toolbar from '@mui/material/Toolbar'
import Typography from '@mui/material/Typography'
import IconButton from '@mui/material/IconButton'
import Tooltip from '@mui/material/Tooltip'
import FilterListIcon from '@mui/icons-material/FilterList'
import { TableToolbarProps } from '../../../types/table'

export default function TableToolbar(props: TableToolbarProps) {
    const { title } = props

    return (
        <Toolbar
            sx={{
                pl: { sm: 2 },
                pr: { xs: 1, sm: 1 },
            }}
        >
            <Typography
                sx={{ flex: '1 1 100%' }}
                variant="h6"
                id="tableTitle"
                component="div"
            >
                {title}
            </Typography>
            <Tooltip title="Filter list">
                <IconButton>
                    <FilterListIcon />
                </IconButton>
            </Tooltip>
        </Toolbar>
    )
}