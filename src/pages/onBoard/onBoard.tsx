// eslint-disable-next-line react/prop-types
const OnBoard = ({ children }: any) => {
  return (
    <div className="flex items-center justify-center w-full">
      <div className="bg-white p-10 rounded-xl w-full shadow-xl">
        {children}
      </div>
    </div>
  );
};

export default OnBoard;
