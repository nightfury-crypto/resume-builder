
import "./TempOne.css";

const TempOne = ({name, tagline}) => {
  console.log(name, tagline)
  return (
      <div className="template1">
        <h5>{name}</h5>
        <p>{tagline}</p>
      </div>
  )
}

export default TempOne;
