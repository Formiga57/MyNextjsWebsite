import axios from 'axios';
import { GetServerSideProps } from 'next';
import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { serialize } from 'next-mdx-remote/serialize';
import { MDXRemote, MDXRemoteSerializeResult } from 'next-mdx-remote';
import renderMathInElement from 'katex/dist/contrib/auto-render.mjs';

interface IEditorContainer {
  hovering: boolean;
}

interface IAdminPostInfos {
  images: string[];
  title: string;
  description: string;
  slug: string;
  toolsTags: number[];
  content: string;
  banner: string;
}

const EditorContainer = styled.textarea<IEditorContainer>`
  margin: 60px auto;
  width: 60%;
  height: 300px;
  background-color: black;
  color: white;
  ${(p) => {
    if (p.hovering) {
      return `background-color:red;`;
    }
  }}
`;

const UploadedImages = styled.div`
  margin: auto;
  display: flex;
  flex-wrap: wrap;
  background-color: red;
  width: 60%;
`;

const Preview = styled.div`
  margin: auto;
  background-color: blue;
  width: 60%;
`;

interface IProps {
  _id: string;
  end: (string?) => void;
}
const Images = styled.div`
  width: 100%;
  p {
    flex-grow: 1;
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    width: 100%;
    img {
      height: 250px;
      margin: 5px;
    }
  }
`;
const Post: React.FC<IProps> = ({ _id, end }) => {
  const [hoveringFile, setHoveringFile] = useState<boolean>(false);
  const [Files, setFiles] = useState<File[]>([]);
  const [Data, setData] = useState<IAdminPostInfos | null>(null);
  const [serializedMd, setSerializedMd] =
    useState<MDXRemoteSerializeResult<Record<string, unknown>>>();
  useEffect(() => {
    axios
      .post(`http://localhost:3000/api/projects/getPostInfo/`, { _id: _id })
      .then((res) => {
        const data = res.data as IAdminPostInfos;
        setData(data);
        serialize(Data?.content).then((serialized) => {
          setSerializedMd(serialized);
        });
        console.log(data);
      });
  }, []);

  return (
    <>
      <input
        type='text'
        placeholder='Title'
        value={Data?.title}
        onChange={(e) => setData({ ...Data, title: e.target.value })}
      />
      <textarea
        placeholder='Desc'
        value={Data?.description}
        onChange={(e) => setData({ ...Data, description: e.target.value })}
      />
      <input
        type='text'
        placeholder='Slug'
        value={Data?.slug}
        onChange={(e) => setData({ ...Data, slug: e.target.title })}
      />
      <EditorContainer
        value={Data?.content}
        onChange={(e) => {
          setData({ ...Data, content: e.target.value });
          serialize(Data?.content).then((serialized) => {
            setSerializedMd(serialized);
          });
        }}
        hovering={hoveringFile}
        // onClick={() => {
        //   const formData = new FormData();
        //   Files.forEach((i) => {
        //     formData.append('imgArray', i, i.name);
        //   });
        //   formData.append('id', 'testfileshahahahaha');
        //   axios
        //     .post('http://localhost:3000/api/uploadfile', formData)
        //     .then((res) => {
        //       setUploadedImages(res.data.data);
        //     });
        // }}
        onDrop={(e) => {
          e.preventDefault();
          if (e.dataTransfer.items) {
            for (var i = 0; i < e.dataTransfer.items.length; i++) {
              if (e.dataTransfer.items[i].kind === 'file') {
                var file = e.dataTransfer.items[i].getAsFile();
                console.log('File: ' + file.name + ' ' + file.type);
                setFiles([...Files, file]);
                console.log(Files);
                const name = file.name;
                if (name.substring(name.length - 3) === '.md') {
                  console.log('É markdown');
                } else if (name.substring(name.length - 4) === '.jpg') {
                  console.log('É jpg');
                  const formData = new FormData();
                  formData.append('id', _id);
                  formData.append('imgArray', file, name);
                  axios
                    .post('http://localhost:3000/api/uploadfile', formData)
                    .then((res) => {
                      let contentCopy = Data.content;
                      contentCopy += `<Images>\n![alt text](http://localhost:3000${res.data.data[0]})\n</Images>`;
                      setData({ ...Data, content: contentCopy });
                    });
                }
              }
            }
          }
          setHoveringFile(false);
        }}
        onDragOver={(e) => {
          e.preventDefault();
          if (!hoveringFile) {
            setHoveringFile(true);
          }
        }}
        onDragLeave={(e) => {
          e.preventDefault();
          if (hoveringFile) {
            setHoveringFile(false);
          }
        }}
      >
        dad
      </EditorContainer>
      <UploadedImages>
        {Data?.images.map((i, j) => {
          if (i === Data.banner) {
            return (
              <div style={{ border: 'solid 5px black' }} key={j}>
                <img
                  src={`http://localhost:3000/posts/uploads/${_id}/${i}`}
                  height={'120px'}
                />
              </div>
            );
          } else {
            return (
              <img
                key={j}
                src={`http://localhost:3000/posts/uploads/${_id}/${i}`}
                height={'120px'}
                onClick={() => {
                  setData({ ...Data, banner: i });
                }}
              />
            );
          }
        })}
      </UploadedImages>
      <Preview>
        {(() => {
          if (serializedMd) {
            return <MDXRemote {...serializedMd} components={{ Images }} />;
          }
        })()}
      </Preview>
      <button
        type='submit'
        onClick={() => {
          axios
            .post(`http://localhost:3000/api/projects/updatePostInfo/`, {
              ...Data,
              _id: _id,
            })
            .then((res) => {
              end(null);
            });
        }}
      >
        Enviar
      </button>
    </>
  );
};

export default Post;
