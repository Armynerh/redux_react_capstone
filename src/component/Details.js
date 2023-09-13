import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchJobs } from '../redux/jobs/jobsSlice';

const Details = () => {
  const location = useLocation();
  const slug = location.pathname.split('/')[2];
  const jobs = useSelector((state) => state.jobs.jobs);
  const job = useSelector((state) => state.jobs.jobs.find((j) => j.slug === slug));
  const dispatch = useDispatch();
  console.log({
    slug, location, job, jobs,
  });

  useEffect(() => {
    if (!jobs.length) {
      dispatch(fetchJobs());
    }
  }, [jobs, dispatch]);

  if (!job) {
    return null;
  }

  return (
    <>
      <ul>
        <li>
          <div>{job.title}</div>
          <div>{job.location}</div>
          {job.job_types.map((type) => (
            <div key={type}>{type}</div>
          ))}
          <div>{job.tags[0]}</div>
        </li>
      </ul>
    </>
  );
};
export default Details;
