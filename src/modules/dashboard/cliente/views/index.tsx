const index = () => {
  return (
    <>
      <h1>Cliente</h1>
      <div className="bg-pink-500 container mx-auto px-4 lg:max-w-[1200px]">
        <div>
          <h1>Demo APP</h1>
        </div>

        <div className="flex flex-row gap-4">
          <div className="flex flex-col bg-blue-500 p-4">
            <h1>Item 1</h1>
            <h2>Item 2</h2>
          </div>
          <div className="bg-green-500 p-4">Otro div</div>
        </div>

        <div className="flex flex-col gap-4">
          <div className="flex flex-col bg-red-500 p-4">
            <span>Item A</span>
            <span>Item B</span>
          </div>
          <div className="bg-yellow-500 p-4">Otro div</div>
        </div>
      </div>
    </>
  );
};

export default index;
