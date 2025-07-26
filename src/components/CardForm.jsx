const CardForm = ({ children,title,colSize }) => {
  return (
    <div className="row justify-content-center mb-3">
      <div className={"col-lg-"+colSize}>
        <div className="card">
            <div className="card-header fs-4 text-center">
                {title}
            </div>
            <div className="card-body">
                {children}
          </div>
        </div>
      </div>
    </div>
  );
};
export default CardForm;
