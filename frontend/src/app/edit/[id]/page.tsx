"use client";
import { AuthContext } from "@/providers/auth-provider";
import { useFormik } from "formik";
import dynamic from "next/dynamic";
import { useRouter } from "next/navigation";
import { useContext, useEffect, useState } from "react";
import "react-quill/dist/quill.snow.css";
import * as Yup from "yup";
import axios from "../../../../axios-request/axios-request";

const ReactQuill = dynamic(
  () => {
    return import("react-quill");
  },
  { ssr: false }
);

const getCategores = async (): Promise<CategoryI[] | null> => {
  const res = await axios.get("/category");
  if (res.status !== 200) {
    return null;
  }
  return res.data;
};

const getPreviousPostData = async (id: string): Promise<Post | null> => {
  const res = await axios.get(`/posts/${id}`);

  if (res.status !== 200) {
    return null;
  }
  return res.data;
};

// update post
const updatePost = async (
  id: string,
  values: PostCreateData
): Promise<Post> => {
  try {
    const res = await axios.put(`/posts/${id}`, values);

    return res.data;
  } catch (err) {
    throw new Error("Post Create problem");
  }
};

const validationSchema = Yup.object().shape({
  title: Yup.string().required("Title is required*"),
  img: Yup.string().required("Title Image URL is required*"),
  desc: Yup.string().required("Description is required*"),
  category_id: Yup.number().required("Select a Category*"),
});
const EditPost = ({ params }: { params: { id: string } }) => {
  const { id } = params;
  const [category, setCategory] = useState<CategoryI[]>([]);
  const [previousPostData, setPreviousPostData] = useState<Post>();

  const { state } = useContext(AuthContext);
  const route = useRouter();

  const formik = useFormik({
    initialValues: {
      title: previousPostData?.title!,
      img: previousPostData?.img!,
      desc: previousPostData?.desc!,
      category_id: Number(previousPostData?.id.toString()!),
    },
    enableReinitialize: true,
    validationSchema: validationSchema,
    onSubmit: async (values, actions) => {
      try {
        const selectedCategory = category.find(
          (v) => v.id == values.category_id
        );
        const newData = {
          ...values,
          cat_slug: selectedCategory?.title!,
          user_id: state.user?.id!,
          user_email: state.user?.email!,
          user_name: state.user?.name!,
        };

        const result = await updatePost(id, newData);
        console.log(result);
        if (result.id) {
          route.push(`/posts/${result.id}`);
        }
      } catch (error) {}

      actions.setSubmitting(false);
    },
  });

  useEffect(() => {
    async function getData() {
      try {
        const data = await getCategores();
        if (data) {
          setCategory(() => [...data]);
        }
      } catch (error) {}
    }
    getData();
  }, []);

  useEffect(() => {
    async function getData() {
      try {
        const data = await getPreviousPostData(id);
        if (data) {
          setPreviousPostData(() => data);
        }
      } catch (error) {}
    }
    getData();
  }, [id]);

  return (
    <div className="pt-8">
      <form onSubmit={formik.handleSubmit} className="text-softlight">
        <div className="flex justify-end mb-4">
          <button
            type="submit"
            className="text-white max-w-max px-2 bg-blue-500 rounded-sm"
          >
            Update Post
          </button>
        </div>
        <div className="flex flex-col gap-3">
          <div>
            <input
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.title}
              name="title"
              type="text"
              placeholder="Title"
              className="px-3 py-3 w-full rounded-sm bg-darkLight"
            />
            <div className="h-4 my-2">
              {formik.errors.title && formik.touched.title && (
                <div>{formik.errors.title}</div>
              )}
            </div>
          </div>

          <div>
            <input
              type="text"
              name="img"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.img}
              placeholder="Title Image Link"
              className="px-3 py-3 w-full rounded-sm bg-darkLight"
            />
            <div className="h-4 my-2">
              {formik.errors.img && formik.touched.img && (
                <div>{formik.errors.img}</div>
              )}
            </div>
          </div>

          <div>
            <select
              className="px-3 py-3 w-full text-light rounded-sm bg-darkLight"
              onBlur={formik.handleBlur}
              value={formik.values.category_id}
              onChange={(e) =>
                formik.setFieldValue("category_id", Number(e.target.value))
              }
              name="category_id"
            >
              <option value={""}>Select Category</option>
              {category.map((v, index) => (
                <option key={index} value={v.id}>
                  {v.title}
                </option>
              ))}
            </select>
          </div>

          <div>
            <ReactQuill
              theme="snow"
              className="text-light placeholder:text-light"
              value={formik.values.desc}
              onChange={(e: string) => formik.setFieldValue("desc", e)}
              placeholder="Tell your story..."
            />
          </div>
        </div>
      </form>
    </div>
  );
};

export default EditPost;
