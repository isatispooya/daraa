import { useEffect, useState } from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Divider from '@mui/material/Divider';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import LoadingButton from '@mui/lab/LoadingButton';
import Skeleton from '@mui/material/Skeleton';
import { alpha, useTheme } from '@mui/material/styles';
import axios from 'axios';
import { getCookie, setCookie } from 'src/api/cookie';
import { useRouter } from 'src/routes/hooks';
import { bgGradient } from 'src/theme/css';
import { OnRun } from 'src/api/OnRun';
import { ToastContainer, toast } from 'react-toastify';

export default function LoginView() {
  const theme = useTheme();
  const router = useRouter();
  const [nationalCode, setNationalCode] = useState('');
  const [captchaInput, setCaptchaInput] = useState('');
  const [captchaImage, setCaptchaImage] = useState(null);
  const [encrypted_response, setEncrypted_response] = useState(null);
  const [otp, setOtp] = useState('');
  const [step, setStep] = useState(1);
  const [isChecking, setIsChecking] = useState(true); // برای نمایش پیام در حال بررسی
  const [loadingCaptcha, setLoadingCaptcha] = useState(true); // For loading state of captcha

  const getCaptcha = () => {
    setLoadingCaptcha(true);
    axios
      .post(`${OnRun}/captcha`)
      .then((response) => {
        setEncrypted_response(response.data.encrypted_response);
        setCaptchaImage(response.data.image);
        setLoadingCaptcha(false);
      })
      .catch((err) => {
        console.log('error captcha', err);
        setLoadingCaptcha(false);
      });
  };

  const applyNationalCode = () => {
    if (captchaInput.length === 0) {
      toast.warning('کد تصویر صحیح نیست');
    } else if (nationalCode.length !== 10) {
      toast.warning('مقدار کد ملی را به صورت صحیح وارد کنید');
    } else {
      axios({
        method: 'POST',
        url: `${OnRun}/dara/applynationalcode`,
        data: {
          UserInput: { captcha: captchaInput, nationalCode },
          captchaCode: encrypted_response,
        },
      }).then((response) => {
        if (response.data.replay) {
          if (response.data.status === 'NotFund') {
            toast.warning('متاسفانه کد ملی وارد شده یافت نشد');
          } else if (response.data.status === 'RegisterDara') {
            toast.warning('متاسفانه کد ملی وارد شده یافت نشد');
          } else {
            setStep(2);
          }
        } else {
          toast.warning(response.data.msg);
        }
      });
    }
  };

  const handleCode = () => {
    if (otp.length !== 5) {
      toast.warning('کد صحیح نیست');
    } else {
      axios({
        method: 'POST',
        url: `${OnRun}/dara/coderegistered`,
        data: { nationalCode, Code: otp },
      }).then((response) => {
        if (response.data.replay) {
          setCookie('phn', response.data.cookie, 1);
          router.push('/company');
        } else {
          toast.warning(response.data.msg);
        }
      });
    }
  };

  const id = getCookie('phu');
  const AccessCheck = () => {
    setIsChecking(true);
    if (id) {
      axios({
        method: 'POST',
        url: `${OnRun}/dara/access`,
        data: { cookie: id },
      }).then((response) => {
        if (response.data.replay) {
          router.push('/company');
        } else {
          router.push('/login');
          setCookie('phu', '', 0);
        }
      });
    }
    setIsChecking(false);
  };

  useEffect(getCaptcha, []);
  useEffect(AccessCheck, [id, router]);

  const renderForm = (
    <>
      <Stack spacing={3} sx={{ mb: 3 }}>
        <TextField
          value={nationalCode}
          onChange={(e) => setNationalCode(e.target.value)}
          label="شماره ملی"
        />
        {step === 1 ? (
          <>
            <TextField
              value={captchaInput}
              onChange={(e) => setCaptchaInput(e.target.value)}
              label="کپچا"
            />
            <Button onClick={getCaptcha}>
              {loadingCaptcha ? (
                <Skeleton variant="rectangular" width={150} height={50} />
              ) : (
                <img src={`data:image/png;base64,${captchaImage}`} alt="captcha" />
              )}
            </Button>
            <Box sx={{ mb: 3 }} />
          </>
        ) : (
          <TextField value={otp} onChange={(e) => setOtp(e.target.value)} label="کد تایید" />
        )}
      </Stack>

      <LoadingButton
        fullWidth
        size="large"
        type="submit"
        variant="contained"
        color="inherit"
        onClick={step === 1 ? applyNationalCode : handleCode}
      >
        تایید
      </LoadingButton>
    </>
  );

  if (isChecking) {
    return <div>در حال بررسی دسترسی...</div>;
  }

  return (
    <Box
      sx={{
        ...bgGradient({
          color: alpha(theme.palette.background.default, 0.9),
          imgUrl: '/assets/background/overlay_4.jpg',
        }),
        height: 1,
      }}
    >
      <ToastContainer />
      <Stack alignItems="center" justifyContent="center" sx={{ height: 1 }}>
        <Card
          sx={{
            p: 5,
            width: 1,
            maxWidth: 420,
          }}
        >
          <Typography
            sx={{
              display: 'flex',
              flexDirection: 'column',
              gap: 3,
              alignItems: 'center',
              marginBottom: 3,
            }}
          >
            <Typography sx={{ marginBottom: 2 }} variant="h">
              درگاه سهامداران
            </Typography>
            <Typography variant="h">گروه مالی و سرمایه گذاری ایساتیس پویا</Typography>
          </Typography>
          <Divider sx={{ my: 3 }}>
            <Typography variant="body2" sx={{ color: 'text.secondary' }}>
              ورود
            </Typography>
          </Divider>
          {renderForm}
        </Card>
      </Stack>
    </Box>
  );
}
