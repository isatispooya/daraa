import { Helmet } from 'react-helmet-async';
import { ProjectView } from 'src/sections/products/project';


// ----------------------------------------------------------------------

export default function ProductsPage() {
  return (
    <>
      <Helmet>
        <title> پیشرفت پروژه </title>
      </Helmet>

      <ProjectView />
    </>
  );
}
