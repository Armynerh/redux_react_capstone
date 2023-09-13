import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { fetchJobs } from '../redux/jobs/jobsSlice';

const Jobs = () => {
  const [query, setQuery] = useState('');
  const state = useSelector((state) => state);
  const jobs = useSelector((state) => state.jobs.jobs);
  const status = useSelector((state) => state.jobs.status);
  const error = useSelector((state) => state.jobs.error);
  const dispatch = useDispatch();
  console.log({ state });
  useEffect(() => {
    if (status === 'idle') {
      dispatch(fetchJobs());
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

  if (jobs.length < 1) {
    return null;
  }
  return (
    <>
      <div>
        <div>
          <h1>Air pollution</h1>
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
      <div className="container">
        {jobs.filter((job) => job.company_name.includes(query)).map((job) => (
          <div key={job.slug} className="row">
            <Link to={`/job/${job.slug}`}>
              <div className="card col-2 d-flex">
                {job.company_name}
              </div>
            </Link>
          </div>

        ))}
      </div>
    </>
  );
};

export default Jobs;
