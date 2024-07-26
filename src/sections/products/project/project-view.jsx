import { useEffect, useState } from 'react';

import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Scrollbar from 'src/components/scrollbar';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';

import axios from 'axios';

export default function ProjectView() {
  const [data, setData] = useState(null);

  const ProjectProcess = () => {
    axios
      .get(`https://farasite.fidip.ir/ProjectProgress/?Domain=ipmill.ir`)
      .then((response) => {
        setData(response.data);
      })
      .catch((err) => {
        console.log('error captcha', err);
      });
  };
  useEffect(ProjectProcess, []);

  return (
    <Container>
      <Typography variant="h4" sx={{ mb: 5 }}>
        پیشرفت پروژه
      </Typography>

      <Scrollbar>
        <TableContainer sx={{ overflow: 'unset' }}>
          <Table sx={{ minWidth: 800, paddingX: '50', textAlign: 'start' }}>
            <TableHead>
              <TableRow>
                <TableCell align="right">عنوان</TableCell>
                <TableCell align="right">تاریخ</TableCell>
                <TableCell align="right">فایل</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {data
                ? data.map((item) => (
                    <TableRow key={item.id}>
                      <TableCell component="th" scope="row" sx={{ textAlign: 'start' }}>
                        {item.Title}
                      </TableCell>
                      <TableCell component="th" scope="row" sx={{ textAlign: 'start' }}>
                        {item.Date}
                      </TableCell>
                      <TableCell component="th" scope="row" sx={{ textAlign: 'start' }}>
                        <a target="_blank" href={item.File} rel="noreferrer">
                          PDF
                        </a>
                      </TableCell>
                    </TableRow>
                  ))
                : null}
            </TableBody>
          </Table>
        </TableContainer>
      </Scrollbar>
    </Container>
  );
}
