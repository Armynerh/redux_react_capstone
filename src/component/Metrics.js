import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { fetchMetrics } from '../redux/metrics/metricsSlice';

const Metrics = () => {
  const [query, setQuery] = useState('');
  const metrics = useSelector((state) => state.metrics.metrics);
  const status = useSelector((state) => state.metrics.status);
  const error = useSelector((state) => state.metrics.error);
  const dispatch = useDispatch();
  const met = metrics.filter((metric) => metric.stateName.toLowerCase().includes(query));
  useEffect(() => {
    if (status === 'idle') {
      dispatch(fetchMetrics());
    }
  }, [status, dispatch]);
  if (status === 'loading') {
    return <div>Loading...</div>;
  }

  if (status === 'failed') {
    return (
      <div>
        Error:
        {error}
      </div>
    );
  }

  if (metrics.length < 1) {
    return null;
  }
  return (
    <>
      <p className="text-center mt-5 text-light fw-bold">Vaccination data of Malaysia</p>
      <div className="d-flex justify-content-between m-5 align-items-center">
        <div>
          <p className="text-light fs-4">STATS BY STATES</p>
        </div>
        <div>
          <form id="search-form" role="search">
            <input
              id="q"
              aria-label="Search Company"
              placeholder="Search"
              type="search"
              name="q"
              onChange={(event) => setQuery(event.target.value)}
              className="form-control rounded"
            />
            <div
              id="search-spinner"
              aria-hidden
              hidden
            />
            <div
              className="sr-only"
              aria-live="polite"
            />
          </form>

        </div>
      </div>
      <div className="d-flex flex-wrap m-auto justify-content-around">
        {met.map((metric, i) => (
          <div key={metric.total} className="col-md-4 col-lg-3 p-5 m-3 shadow" style={i % 2 === 0 ? { backgroundColor: '#4268B0' } : { backgroundColor: '#4063A7;' }}>
            <Link to={`/metric/${metric.total}`}>
              <div className="w-100 text-light text-center p-3 fw-bold text-uppercase fs-3">
                <div>{metric.stateName}</div>
                <div className="d-flex">
                  <p>Total:</p>
                  <span className="mx-2">{metric.total}</span>
                </div>
              </div>
            </Link>
          </div>

        ))}
      </div>
    </>
  );
};

export default Metrics;
