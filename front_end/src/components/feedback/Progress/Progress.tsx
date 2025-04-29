import ProgressBar from 'react-bootstrap/ProgressBar';

function Progress({ valueProg }: { valueProg: number }) {
    return <ProgressBar now={valueProg} label={`${valueProg}%`} />;
}

export default Progress;