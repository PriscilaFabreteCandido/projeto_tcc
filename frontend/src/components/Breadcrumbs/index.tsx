import { Breadcrumb } from 'antd';
import React from 'react';
import './styles.css';
import { useLocation, useNavigate } from 'react-router-dom';

export default function Breadcrumbs() {
  const location = useLocation();
  const pathnames = location.pathname.split('/').filter((x) => x);
  const navigate = useNavigate() as any;

  const handleNavigate = (e: any, routeTo: any) => {
    e.preventDefault();
    navigate(routeTo);
  };

  
  return (
    <Breadcrumb style={{ marginLeft: "16px", padding: "2px" }}>
      {pathnames.map((path, index) => {
        const routeTo = `/${pathnames.slice(0, index + 1).join('/')}`;
        const decodedPath = decodeURIComponent(path);
        const isLast = index === pathnames.length - 1;

        return (
          <Breadcrumb.Item key={path}>
            {isLast ? (
              <span style={{ color:  "#001529" }}>{decodedPath}</span>
            ) : (
              <a style={{ color: "#b0b0b0" }} href={routeTo} onClick={(e) => handleNavigate(e, routeTo)}>
                {decodedPath}
              </a>
            )}
          </Breadcrumb.Item>
        );
      })}
    </Breadcrumb>
  );
}
