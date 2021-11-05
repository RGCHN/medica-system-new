import React, { useCallback, useEffect, useState } from 'react';
import { Carousel, Collapse, message, Image, Empty } from 'antd';
import { get } from '@/utils';
import { useModel } from 'umi';
import ProCard from '@ant-design/pro-card';
import { getPerfImgs } from '@/services/api';

const { Panel } = Collapse;
const settings = {
  infinite: false,
  speed: 500,
  slidesToShow: 6,
  slidesToScroll: 2,
  draggable: true,
};

const RoiRegion = () => {
  const [perfImgs, setPerfImgs] = useState([]);
  const [loading, setLoading] = useState(true);
  const { getPatientID } = useModel('patient');
  const patientID = getPatientID();

  const getData = useCallback(async () => {
    try {
      const res = await getPerfImgs({
        patientID,
      });
      if (res.data.status === 'success') {
        const rl = get(res, 'data.data.perf_imgs', []);
        if (rl && rl.length !== 0) {
          setPerfImgs(rl);
        } else {
          setPerfImgs([]);
        }
        setLoading(false);
        return;
      }
      message.error('网络错误！请稍后重试！');
    } catch (e) {
      message.error('网络错误！请稍后重试！');
      console.log(e);
    }
    setLoading(false);
  }, []);

  const getImgList = useCallback((imgData) => {
    return (
      <Carousel {...settings}>
        {imgData.map((item, index) => (
          <>
            <Image src={item} alt="" key={index} height={160} width={160} />
            <div className="img-index">{index + 1}</div>
          </>
        ))}
      </Carousel>
    );
  }, []);

  useEffect(() => {
    getData();
  }, []);

  console.log(perfImgs);

  return (
    <ProCard loading={loading}>
      {perfImgs.length === 0 ? (
        <Empty description="暂无数据" />
      ) : (
        <Collapse defaultActiveKey={[0]}>
          {perfImgs.map((perf, index) => (
            <Panel key={index} header={perf.text_info.split(' ')[0]}>
              {/* {
                    getImgList(perf.perfusion.perfusion_imgs)
                  }*/}
              <div className="desc">{perf.text_info.slice(42, -1)}</div>
            </Panel>
          ))}
        </Collapse>
      )}
    </ProCard>
  );
};

export default RoiRegion;
