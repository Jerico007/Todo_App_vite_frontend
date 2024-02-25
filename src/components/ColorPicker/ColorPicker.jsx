/* eslint-disable react/prop-types */


const ColorPicker = ({ className, dataAos, callback }) => {
  return (
      <div
        className={className}
        onClick={(e) => {
          e.stopPropagation();
        }}
        data-aos={dataAos}
      >
        <div
          id="#f1c40f"
          style={{ backgroundColor: "#f1c40f" }}
          onClick={callback}
        ></div>
        <div
          id="#a68bd5"
          style={{ backgroundColor: "#a68bd5" }}
          onClick={callback}
        ></div>
        <div
          id="#879bb0"
          style={{ backgroundColor: "#879bb0" }}
          onClick={callback}
        ></div>
        <div
          id="#7cb976"
          style={{ backgroundColor: "#7cb976" }}
          onClick={callback}
        ></div>
        <div
          id="#b5b44d"
          style={{ backgroundColor: "#b5b44d" }}
          onClick={callback}
        ></div>
        <div
          id="#f19674"
          style={{ backgroundColor: "#f19674" }}
          onClick={callback}
        ></div>
        <div
          id="#ffff"
          style={{ backgroundColor: "#ffff" }}
          onClick={callback}
        ></div>
      </div>
  );
};

export default ColorPicker;
