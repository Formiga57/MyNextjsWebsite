import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { serialize } from 'next-mdx-remote/serialize';
import { MDXRemote, MDXRemoteSerializeResult } from 'next-mdx-remote';
// import renderMathInElement from 'katex/dist/contrib/auto-render.mjs';
import {
  GetPostInfo,
  UpdatePost,
  UploadImages,
} from '../../../services/projectsApi';
import { address } from '../../../utils/values';

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

const Input = styled.input`
  border: inherit;
  border-radius: inherit;
  outline: inherit;
  background: transparent;
  border-bottom: 2px solid black;
  box-sizing: border-box;
  padding: 5px;
  width: 80%;
  font-size: 15pt;
  margin: auto;
`;

const EditorContainer = styled.textarea<IEditorContainer>`
  font-family: 'Poppins';
  margin: 30px auto;
  width: 80%;
  height: 300px;
  border-radius: 5px;
  outline: none;
  background-color: white;
  color: black;
  resize: none;
  font-size: 12pt;
  ${(p) => {
    if (p.hovering) {
      return `background-color:red;`;
    }
  }}
`;

const DescContainer = styled.textarea`
  margin: 30px auto;
  width: 80%;
  height: 150px;
  border-radius: 5px;
  outline: none;
  background-color: white;
  color: black;
  resize: none;
  font-family: 'Poppins';
  font-size: 12pt;
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
  background-color: white;
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
    GetPostInfo(_id).then((res) => {
      const data = res.data as IAdminPostInfos;
      setData(data);
      serialize(Data?.content).then((serialized) => {
        setSerializedMd(serialized);
      });
    });
  }, []);

  return (
    <div style={{ margin: 'auto' }}>
      <br />
      <Input
        type='text'
        placeholder='Title'
        value={Data?.title || ' '}
        onChange={(e) => setData({ ...Data, title: e.target.value })}
      />
      <Input
        type='text'
        placeholder='Slug'
        value={Data?.slug || ' '}
        onChange={(e) => setData({ ...Data, slug: e.target.title })}
      />
      <DescContainer
        placeholder='Desc'
        value={Data?.description || ' '}
        onChange={(e) => setData({ ...Data, description: e.target.value })}
      />
      <EditorContainer
        value={Data?.content || ' '}
        onChange={(e) => {
          setData({ ...Data, content: e.target.value });
        }}
        onBlur={() => {
          serialize(Data?.content).then((serialized) => {
            setSerializedMd(serialized);
          });
        }}
        hovering={hoveringFile}
        onDrop={(e) => {
          e.preventDefault();
          if (e.dataTransfer.items) {
            for (var i = 0; i < e.dataTransfer.items.length; i++) {
              if (e.dataTransfer.items[i].kind === 'file') {
                var file = e.dataTransfer.items[i].getAsFile();
                setFiles([...Files, file]);
                const name = file.name;
                if (name.substring(name.length - 3) === '.md') {
                } else if (name.substring(name.length - 4) === '.jpg') {
                  const formData = new FormData();
                  formData.append('id', _id);
                  formData.append('imgArray', file, name);
                  UploadImages(formData).then((res) => {
                    let contentCopy = Data.content;
                    contentCopy += `\n<Images>\n![alt text](${address}${res.data.data[0]})\n</Images>`;
                    setData({
                      ...Data,
                      content: contentCopy,
                      images: res.data.images,
                    });
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
      ></EditorContainer>
      <UploadedImages>
        {Data?.images.map((i, j) => {
          if (i === Data.banner) {
            return (
              <div style={{ border: 'solid 5px black' }} key={j}>
                <img
                  src={`${address}/posts/uploads/${_id}/${i}`}
                  height={'120px'}
                />
              </div>
            );
          } else {
            return (
              <img
                key={j}
                src={`${address}/posts/uploads/${_id}/${i}`}
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
          UpdatePost(Data, _id).then((res) => {
            end(null);
          });
        }}
      >
        Enviar
      </button>
      <button
        onClick={() => {
          end(null);
        }}
      >
        Voltar
      </button>
    </div>
  );
};

export default Post;
