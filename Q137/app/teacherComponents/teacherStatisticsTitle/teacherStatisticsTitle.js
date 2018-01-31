import React from 'react';
import './styleTeacherStatisticsTitle.css';

export default class TeacherStatisticsTitle extends React.Component{
    constructor() {
        super();
    }
    render() {
        return (
            <div>
                <div className="teacherStatisticsTitle_box">
                    <div  className="teacherStatisticsTitle_boxWrap">
                        <div className="teacherStatisticsTitle_boxMsg">
                            <p>学员管理</p>
                            <span>聚焦单个学员&nbsp;&nbsp; 多维度综合统计&nbsp;&nbsp; 全面分析数据</span>
                        </div>
                        <img src={require('../../images/headMaster/headMaster_banner.png')} alt=""/>
                    </div>
                </div>
            </div>
        );
    }
}