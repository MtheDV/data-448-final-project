type SpinnerProps = {
  isLoading: boolean
}

const Spinner = ({ isLoading }: SpinnerProps) => {
  if (!isLoading) {
    return null;
  }
  
  return (
    <p>
      Loading...
    </p>
  );
};

export default Spinner;
