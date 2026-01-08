import React, { useState } from "react";
import { Layout } from "antd";
import icon1 from "../../../public/images/audit2.png";
import Cards from "../../components/HomeCards/Cards";
import { ArrowLeftOutlined } from "@ant-design/icons";
import Fotter from "../../components/Fotter/Fotter";
import { Link } from "react-router-dom";

const CardData = [
  {
    title: "Manage your clients",
    icon: icon1,
    link: "/client",
    dec: "you can add or Delete and also View clients",
  },
  {
    title: "Insurancr Company",
    icon: icon1,
    link: "/company",
    dec: "you can add or Delete and also View Insurancr Company",
  },
  {
    title: "Broker",
    icon: icon1,
    link: "/broker",
    dec: "you can add or Delete and also View Broker",
  },
  {
    title: "ClaimWolf Agents",
    icon: icon1,
    link: "/agent",
    dec: "you can add or Delete and also View ClaimWolf' Agents",
  },
  {
    title: "Vendor",
    icon: icon1,
    link: "/vendor",
    dec: "you can add or Delete and also View Vendor",
  },
  {
    title: "Category",
    icon: icon1,
    link: "/category",
    dec: "you can add or Delete and also View Category",
  },
  {
    title: "Payment Method",
    icon: icon1,
    link: "/payment",
    dec: "you can add or Delete and also View Payment Method",
  },
];

const Administrator = () => {
  return (
    <div>
      <Layout
        className={`w-full bg-transparent`}
      >
        <div className="mt-8">
          <Cards data={CardData} />
        </div>
      </Layout>
      {/* <Fotter /> */}
    </div>
  );
};
export default Administrator;
