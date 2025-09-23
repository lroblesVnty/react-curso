const CardForm = ({ children,title,colSize,estilo='claro' }) => {
  const cardClass = estilo === 'oscuro' ? 'bg-dark text-white' : 'bg-light text-dark';
  return (
    <div className="row justify-content-center mb-3">
      <div className={"col-lg-"+colSize}>
        <div className={`card ${cardClass}`}>
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
