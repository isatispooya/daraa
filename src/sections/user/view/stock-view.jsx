import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Iconify from 'src/components/iconify';
import { Paper } from '@mui/material';
import { getCookie } from 'src/api/cookie';
import axios from 'axios';
import { OnRun } from 'src/api/OnRun';
import { ToastContainer, toast } from 'react-toastify';

// ----------------------------------------------------------------------

export default function UserPage() {
  // const [page, setPage] = useState(0);

  // const [order, setOrder] = useState('asc');

  // const [selected, setSelected] = useState([]);

  // const [orderBy, setOrderBy] = useState('name');

  // const [filterName, setFilterName] = useState('');

  // const [rowsPerPage, setRowsPerPage] = useState(5);

  // const handleSort = (event, id) => {
  //   const isAsc = orderBy === id && order === 'asc';
  //   if (id !== '') {
  //     setOrder(isAsc ? 'desc' : 'asc');
  //     setOrderBy(id);
  //   }
  // };

  // const handleSelectAllClick = (event) => {
  //   if (event.target.checked) {
  //     const newSelecteds = users.map((n) => n.name);
  //     setSelected(newSelecteds);
  //     return;
  //   }
  //   setSelected([]);
  // };

  // const handleClick = (event, name) => {
  //   const selectedIndex = selected.indexOf(name);
  //   let newSelected = [];
  //   if (selectedIndex === -1) {
  //     newSelected = newSelected.concat(selected, name);
  //   } else if (selectedIndex === 0) {
  //     newSelected = newSelected.concat(selected.slice(1));
  //   } else if (selectedIndex === selected.length - 1) {
  //     newSelected = newSelected.concat(selected.slice(0, -1));
  //   } else if (selectedIndex > 0) {
  //     newSelected = newSelected.concat(
  //       selected.slice(0, selectedIndex),
  //       selected.slice(selectedIndex + 1)
  //     );
  //   }
  //   setSelected(newSelected);
  // };

  // const handleChangePage = (event, newPage) => {
  //   setPage(newPage);
  // };

  // const handleChangeRowsPerPage = (event) => {
  //   setPage(0);
  //   setRowsPerPage(parseInt(event.target.value, 10));
  // };

  // const handleFilterByName = (event) => {
  //   setPage(0);
  //   setFilterName(event.target.value);
  // };

  // const dataFiltered = applyFilter({
  //   inputData: users,
  //   comparator: getComparator(order, orderBy),
  //   filterName,
  // });

  // const notFound = !dataFiltered.length && !!filterName;

  const id = getCookie('phn');
  const symbol=getCookie('sym')


  const getSheetpng = () => {
    // console.log({ cookie: id, symbol })
    if (symbol === 'visa') {
      toast.warning('دریافت برگه سهام برای این سهم امکان پذیر نیست');
    } else {
      axios
        .post(`${OnRun}/dara/getSheetpng`, { cookie: id, symbol }, { responseType: 'arraybuffer' })
        .then((response) => {
          const blob = new Blob([response.data], { type: 'image/png' });
          const url = window.URL.createObjectURL(blob);
          // ایجاد یک لینک برای دانلود تصویر
          const link = document.createElement('a');
          link.href = url;
          link.setAttribute('download', 'sheet1.png');
          // اضافه کردن لینک به صفحه و کلیک بر روی آن
          document.body.appendChild(link);
          link.click();
          // حذف لینک بعد از دانلود
          document.body.removeChild(link);
        })
        .catch((error) => {
          console.error('Error fetching image:', error);
        });
    }
  };

  return (
    <Container>
      <ToastContainer/>
      <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
        <Typography variant="h4">برگه سهام</Typography>

        {/* <Button variant="contained" color="inherit" startIcon={<Iconify icon="eva:plus-fill" />}>
          New User
        </Button> */}
      </Stack>
      <Paper
        sx={{
          height: 200,
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-around',
          alignItems: 'center',
        }}
      >
        <Typography variant="h2">دریافت برگه سهم</Typography>
        <Button
          onClick={getSheetpng}
          variant="contained"
          color="inherit"
          startIcon={<Iconify icon="eva:plus-fill" />}
          sx={{ mx: 1 }}
        >
          دریافت برگه سهام
        </Button>
      </Paper>

      {/* <UserTableToolbar
          numSelected={selected.length}
          filterName={filterName}
          onFilterName={handleFilterByName}
        /> */}

      {/* <Scrollbar>
          <TableContainer sx={{ overflow: 'unset' }}>
            <Table sx={{ minWidth: 800 }}>
              <UserTableHead
                order={order}
                orderBy={orderBy}
                rowCount={users.length}
                numSelected={selected.length}
                onRequestSort={handleSort}
                onSelectAllClick={handleSelectAllClick}
                headLabel={[
                  { id: 'name', label: 'Name' },
                  { id: 'company', label: 'Company' },
                  { id: 'role', label: 'Role' },
                  { id: 'isVerified', label: 'Verified', align: 'center' },
                  { id: 'status', label: 'Status' },
                  { id: '' },
                ]}
              />
              <TableBody>
                {dataFiltered
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map((row) => (
                    <UserTableRow
                      key={row.id}
                      name={row.name}
                      role={row.role}
                      status={row.status}
                      company={row.company}
                      avatarUrl={row.avatarUrl}
                      isVerified={row.isVerified}
                      selected={selected.indexOf(row.name) !== -1}
                      handleClick={(event) => handleClick(event, row.name)}
                    />
                  ))}

                <TableEmptyRows
                  height={77}
                  emptyRows={emptyRows(page, rowsPerPage, users.length)}
                />

                {notFound && <TableNoData query={filterName} />}
              </TableBody>
            </Table>
          </TableContainer>
        </Scrollbar> */}

      {/* <TablePagination
          page={page}
          component="div"
          count={users.length}
          rowsPerPage={rowsPerPage}
          onPageChange={handleChangePage}
          rowsPerPageOptions={[5, 10, 25]}
          onRowsPerPageChange={handleChangeRowsPerPage}
        /> */}
    </Container>
  );
}
