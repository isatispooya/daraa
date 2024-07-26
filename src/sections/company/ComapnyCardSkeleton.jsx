import { Button, CardActions, Container, ListItem, ListItemText, Skeleton } from "@mui/material"
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Divider from '@mui/material/Divider';


const CompanyCardSkeleton = () => (
        <Container sx={{ position: 'relative' }}>
            <Skeleton variant="rectangular" width={100} height={100} sx={{ position: 'absolute', top: -50, zIndex: 3,  left: "50%", borderRadius:"50%"}} />
            <Card sx={{ minWidth: 275, height: 270 }} >
                <CardContent sx={{ justifyContent: "center", marginTop: 5 }}>
                    <Skeleton variant="rectangular" width={100} height={30} sx={{marginTop:2}}/>
                    <Skeleton variant="rectangular" width={200} height={20} sx={{marginTop:2}}/>
                    <Divider sx={{ marginTop: 1, marginBottom: 1 }} />
                    <ListItem>
                        <ListItemText
                            primary="تعداد سهام شما"
                            secondary={<Skeleton variant="rectangular" width={100} height={10}/>}
                        />
                        <ListItemText
                            primary="سهام شرکت"
                            secondary={<Skeleton variant="rectangular" width={100} height={10}/>}
                        />
                    </ListItem>
                </CardContent>
                <CardActions>
                    <Button disabled size="small">ورود</Button>
                </CardActions>

            </Card>
        </Container>
    )


export default CompanyCardSkeleton