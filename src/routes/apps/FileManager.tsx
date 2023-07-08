import styled from "styled-components";

const FileManagerContainer = styled.div`
    display: grid;
    grid-template-columns: repeat(3, 1fr);
`;

const FileManager = () => {
    return (
        <FileManagerContainer>
            {/* Render the three file manager components here */}
        </FileManagerContainer>
    );
}

export default FileManager;