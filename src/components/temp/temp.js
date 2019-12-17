import React, { Component } from 'react';
import { Document, Page } from 'react-pdf';

export default class Test extends Component {
    state = {
        numPages: null,
    }

    onDocumentLoadSuccess = (document) => {
        const { numPages } = document;
        this.setState({
            numPages,
        });
    };

    render() {
        const { numPages } = this.state;

        return (
            <Document
                file={{ url: 'https://moneyview-lending-documents.s3.ap-south-1.amazonaws.com/100000026909/100000026909_loan_agreement.pdf?response-content-type=application%2Foctet-stream&X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Date=20191209T134318Z&X-Amz-SignedHeaders=host&X-Amz-Expires=3599&X-Amz-Credential=AKIAJUC6T5P32DMR376Q%2F20191209%2Fap-south-1%2Fs3%2Faws4_request&X-Amz-Signature=50bdb1a750e56869de0a3a3a105c8c0819baf2f1a7535e01ac8a69f048b51b48' }}
            //file={{ url: 'https://raw.githubusercontent.com/mozilla/pdf.js/ba2edeae/examples/learning/helloworld.pdf' }}

            >
                {Array.from(
                    new Array(numPages),
                    (el, index) => (
                        <Page
                            key={`page_${index + 1}`}
                            pageNumber={index + 1}
                        />
                    ),
                )}
            </Document>
        );
    }
}