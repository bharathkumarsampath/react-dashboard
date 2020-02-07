import React from "react";
const PdfViewer = (props) => {
    const { page = 1, height = "700px", width = "800px", src } = props;
    return (
        <embed
            key={page}
            src={`${src}#toolbar=0&navpanes=0&scrollbar=0&page=${page}&view=fitH`}
            type="application/pdf"
            width='896px'
            height='560px'
        />
    );
};
export default PdfViewer;