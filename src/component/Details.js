import { useEffect } from 'react';
import { useLocation, Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { FaAngleLeft } from 'react-icons/fa';
import { fetchMetrics } from '../redux/metrics/metricsSlice';

const Details = () => {
  const location = useLocation();
  const slug = location.pathname.split('/')[2];
  const metrics = useSelector((state) => state.metrics.metrics);
  const metric = metrics.filter((met) => (met.total === Number(slug)));
  const dispatch = useDispatch();

  useEffect(() => {
    if (!metrics.length) {
      dispatch(fetchMetrics());
    }
  }, [metrics, dispatch]);

  if (!metric[0]) {
    return null;
  }
  return (
    <>

      <ul>
        <li className="text-light w-75 m-auto">
          <Link to="/">
            <p className="d-flex m-5 fs-1">
              <FaAngleLeft />
            </p>
          </Link>
          <div className="color1 fs-2 shadow d-flex m-5 p-5">
            <p className="col-5  m-auto p-3">Total Number of people Vaccinated</p>
            <span className="col-5 border-start m-auto p-4">{metric[0].total}</span>
          </div>
          <div className="color2 fs-2 shadow d-flex m-5 p-5">
            <p className="col-5  m-auto p-3">Total Number of people Vaccinated between the ages of 18-59</p>
            <span className="col-5 border-start m-auto p-4 ">{metric[0]['18to59']}</span>
          </div>
          <div className="color1 fs-2 shadow d-flex m-5 p-5">
            <p className="col-5  m-auto p-3">Total Number of people Vaccinated between the ages of 60-60+</p>
            <span className="col-5 border-start m-auto p-4 ">{metric[0]['60andAbove']}</span>
          </div>
        </li>
      </ul>
    </>
  );
};
export default Details;
