import { useEffect } from 'preact/hooks';
import { route } from 'preact-router';

export default function Redirect({ to }) {
  useEffect(() => {
    route(to, true);
  }, [to]);

  return null;
}
