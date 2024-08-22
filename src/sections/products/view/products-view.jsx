import { useState, useEffect } from 'react';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import { TabulatorFull as Tabulator } from 'tabulator-tables';
import 'tabulator-tables/dist/css/tabulator.min.css';
import axios from 'axios';
import { OnRun } from 'src/api/OnRun';
import { getCookie } from 'src/api/cookie';

// ----------------------------------------------------------------------

export default function ProductsView() {
  const [tableData, setTableData] = useState([]);
  const id = getCookie('phn');

  const getData = () => {
    if (id) {
      axios({
        method: 'POST',
        url: `${OnRun}/dara/balancestock`,
        data: { cookie: id },
      }).then((response) => {
        console.log(response.data);
        setTableData(response.data);
      }).catch((error) => {
        console.log('Error:', error);
      });
    }
  };

  useEffect(getData, [id]);

  useEffect(() => {
    const newTable = new Tabulator('#data-table', {
      data: tableData,
      layout: 'fitColumns',
      responsiveLayout: true,
      columnHeaderSortMulti: true,
      pagination: 'local',
      paginationSize: 50,
      paginationSizeSelector: [10, 20, 50, 100, 200, 500],
      movableColumns: true,
      layoutColumnsOnNewData: false,
      textDirection: 'rtl',
      autoResize: true,
      columns: [
        {
          title: 'تاریخ',
          field: 'date',
        },
        {
          title: 'تعداد سهام',
          field: 'تعداد سهام',
          formatter: (cell) => 
             cell.getValue().toLocaleString() 
          ,
        },
      ],
    });

    return () => {
      if (newTable) {
        newTable.destroy();
      }
    };
  }, [tableData]);

  return (
    <Container>
      <Typography variant="h4" sx={{ mb: 5 }}>
        گردش
      </Typography>
      <div
        id="data-table"
        style={{
          border: '1px solid #ddd',
          borderRadius: '5px',
          boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)',
          overflow: 'hidden',
        }}
      />
    </Container>
  );
}
