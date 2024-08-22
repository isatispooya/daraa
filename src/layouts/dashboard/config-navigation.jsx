import SvgColor from 'src/components/svg-color';

// ----------------------------------------------------------------------

const icon = (name) => (
  <SvgColor src={`/assets/icons/navbar/${name}.svg`} sx={{ width: 1, height: 1 }} />
);

const navConfig = [
  {
    title: 'خانه',
    path: '/company',
    icon: icon('ic_company'),
  },
  {
    title: 'میزکار',
    path: '/',
    icon: icon('ic_analytics'),
  },
  {
    title: 'برگه سهام',
    path: '/getstock',
    icon: icon('ic_sheet'),
  },
  {
    title: 'گردش ',
    path: '/trades',
    icon: icon('ic_trade'),
  },
  {
    title: 'پیشرفت پروژه',
    path: '/process',
    icon: icon('ic_upgrade'),
  },
  // {
  //   title: 'مشاهده آنلاین',
  //   path: '/commingsoon',
  //   icon: icon('ic_visioneye'),
  // },
];

export default navConfig;
