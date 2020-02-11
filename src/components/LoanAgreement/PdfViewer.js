import React from "react";
const PdfViewer = (props) => {
    const { src } = props;
    const [error, setError] = React.useState(false);
    var image = new Image;





    return (
        <embed
            key={props.page}
            src={`${src}#toolbar=0&navpanes=0&scrollbar=0&page=${props.page}&view=fitH`}
            type="application/pdf"
            width='94%'
            height='90%'
            error={error}
            alt="Aws pdf url is not valid"
        />
    );
};
export default PdfViewer;