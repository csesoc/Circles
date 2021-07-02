import React from "react";
import { Card, Progress, Typography } from "antd";
import ReactTooltip from "react-tooltip";
import { purple } from "@ant-design/colors";
import { Link } from "react-scroll";

function DegreeComponentCard({ title, subTitle, completedUOC, totalUOC }) {
  const { Title, Text } = Typography;
  const progress = Math.round((completedUOC / totalUOC) * 100);
  //TODO - change tooltip color based off theme variable in redux
  return (
    <Link to={title} smooth={true} duration={1000}>
      <Card className="card text" hoverable bordered={false}>
        <Title className="text" level={5} style={{ marginBottom: "0" }}>
          {title}
        </Title>
        <Text className="secondaryText">{subTitle}</Text>
        <div data-tip data-for={subTitle}>
          <Progress
            percent={progress}
            trailColor="white"
            style={{ marginTop: "0.5em", color: "white" }}
            showInfo={false}
            strokeColor={{ "0%": purple[3], "100%": purple[4] }}
          />
        </div>
        <ReactTooltip id={subTitle} place="bottom">
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <div>{progress}%</div>
            <div>
              ({completedUOC}/{totalUOC} UOC)
            </div>
          </div>
        </ReactTooltip>
      </Card>
    </Link>
  );
}

export default DegreeComponentCard;