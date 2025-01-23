

export const Table = ({ title = [], datos = [] }) => {
  return (
    <>
      {datos.length > 0 && (
        <div className="w-5/6  mb-9 ">
          <div className="grid grid-cols-5 h-14 text-center border bg-slate-600 text-white">
            {title.map((item, index) => (
              <div
                key={index}
                className="border-r-2 flex items-center justify-center"
              >
                <p>{item}</p>
              </div>
            ))}
            <div className="flex items-center justify-center"><p>Acción</p></div>
          </div>
          <div
            className="h-[300px] overflow-auto "
            style={{
              scrollbarWidth: "none", 
              msOverflowStyle: "none", 
            }}
          >
            {datos.map((item, index) => (
              <div
                key={index}
                className={`grid grid-cols-5 h-14 text-center border ${index%2?"bg-slate-100":""}`}
              >
                {item.map((elem, i) => (
                  <div
                    key={i}
                    className={`border-r-2 flex items-center justify-center ${( elem=="Egreso" )?"text-red-400":""} `}
                  >
                    <p>{elem}</p>
                  </div>
                ))}
              </div>
            ))}
          </div>
        </div>
      )}
    </>
  );
};
