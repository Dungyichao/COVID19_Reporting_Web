import React from 'react';
import { Page, Text, View, Document, StyleSheet } from '@react-pdf/renderer';

//https://react-pdf.org/components#note
//https://github.com/diegomura/react-pdf/issues/487
//hutch120
const BORDER_COLOR = '#bfbfbf'
const BORDER_STYLE = 'solid'
//const COL1_WIDTH = 13
//const COLN_WIDTH = (100 - COL1_WIDTH) / 6
// Create styles
//backgroundColor: '#E4E4E4'
const styles = StyleSheet.create({
  page: {
    flexDirection: 'column',
    
  },
  section: {
    margin: 10,
    
    textAlign: 'center',
    
  },
  body: {
    padding: 10
  },
  table: { 
    display: "table", 
    width: "auto", 
    borderStyle: BORDER_STYLE, 
    borderColor: BORDER_COLOR,
    borderWidth: 1, 
    borderRightWidth: 0, 
    borderBottomWidth: 0 
  }, 
  tableRow: { 
    margin: "auto", 
    flexDirection: "row" 
  }, 
  tableCol1Header: { 
    width: '12' + '%', 
    borderStyle: BORDER_STYLE, 
    borderColor: BORDER_COLOR,
    borderBottomColor: '#000',
    borderWidth: 1, 
    borderLeftWidth: 1, 
    borderTopWidth: 0,
    backgroundColor: '#E4E4E4'
  }, 
  tableColTempHeader: { 
    width: '9' + '%', 
    borderStyle: BORDER_STYLE, 
    borderColor: BORDER_COLOR,
    borderBottomColor: '#000',
    borderWidth: 1, 
    borderLeftWidth: 0, 
    borderTopWidth: 0,
    backgroundColor: '#E4E4E4'
  },  
  tableColSymptomHeader: { 
    width: '28' + '%', 
    borderStyle: BORDER_STYLE, 
    borderColor: BORDER_COLOR,
    borderBottomColor: '#000',
    borderWidth: 1, 
    borderLeftWidth: 0, 
    borderTopWidth: 0,
    backgroundColor: '#E4E4E4'
  },  
  tableColContactHeader: { 
    width: '20' + '%', 
    borderStyle: BORDER_STYLE, 
    borderColor: BORDER_COLOR,
    borderBottomColor: '#000',
    borderWidth: 1, 
    borderLeftWidth: 0, 
    borderTopWidth: 0,
    backgroundColor: '#E4E4E4'
  },   
  tableColTravelHeader: { 
    width: '8' + '%', 
    borderStyle: BORDER_STYLE, 
    borderColor: BORDER_COLOR,
    borderBottomColor: '#000',
    borderWidth: 1, 
    borderLeftWidth: 0, 
    borderTopWidth: 0,
    backgroundColor: '#E4E4E4'
  },  
  tableColTestHeader: { 
    width: '6' + '%', 
    borderStyle: BORDER_STYLE, 
    borderColor: BORDER_COLOR,
    borderBottomColor: '#000',
    borderWidth: 1, 
    borderLeftWidth: 0, 
    borderTopWidth: 0,
    backgroundColor: '#E4E4E4'
  },  
  tableColTimetHeader: { 
    width: '17' + '%', 
    borderStyle: BORDER_STYLE, 
    borderColor: BORDER_COLOR,
    borderBottomColor: '#000',
    borderWidth: 1, 
    borderLeftWidth: 0, 
    borderTopWidth: 0,
    backgroundColor: '#E4E4E4'
  },     
  tableColHeader: { 
    width: "29" + "%", 
    borderStyle: BORDER_STYLE, 
    borderColor: BORDER_COLOR,
    borderBottomColor: '#000',
    borderWidth: 1, 
    borderLeftWidth: 0, 
    borderTopWidth: 0,
    backgroundColor: '#E4E4E4'
  },   
  tableCol1: { 
    width: '12' + '%', 
    borderStyle: BORDER_STYLE, 
    borderColor: BORDER_COLOR,
    borderWidth: 1, 
    borderLeftWidth: 1, 
    borderTopWidth: 0 
  },   
  tableColTemp: { 
    width: '9' + '%', 
    borderStyle: BORDER_STYLE, 
    borderColor: BORDER_COLOR,
    borderWidth: 1, 
    borderLeftWidth: 0, 
    borderTopWidth: 0 
  },  
  tableColSymptom: { 
    width: '28' + '%', 
    borderStyle: BORDER_STYLE, 
    borderColor: BORDER_COLOR,
    borderWidth: 1, 
    borderLeftWidth: 0, 
    borderTopWidth: 0 
  },  
  tableColContact: { 
    width: '20' + '%', 
    borderStyle: BORDER_STYLE, 
    borderColor: BORDER_COLOR,
    borderWidth: 1, 
    borderLeftWidth: 0, 
    borderTopWidth: 0 
  },  
  tableColTravel: { 
    width: '8' + '%', 
    borderStyle: BORDER_STYLE, 
    borderColor: BORDER_COLOR,
    borderWidth: 1, 
    borderLeftWidth: 0, 
    borderTopWidth: 0 
  },  
  tableColTest: { 
    width: '6' + '%', 
    borderStyle: BORDER_STYLE, 
    borderColor: BORDER_COLOR,
    borderWidth: 1, 
    borderLeftWidth: 0, 
    borderTopWidth: 0 
  },  
  tableColTime: { 
    width: '17' + '%', 
    borderStyle: BORDER_STYLE, 
    borderColor: BORDER_COLOR,
    borderWidth: 1, 
    borderLeftWidth: 0, 
    borderTopWidth: 0,
     
  },  
  tableCol: { 
    width: "29" + "%", 
    borderStyle: BORDER_STYLE, 
    borderColor: BORDER_COLOR,
    borderWidth: 1, 
    borderLeftWidth: 0, 
    borderTopWidth: 0 
  }, 
  tableCellHeader: {
    margin: 5, 
    fontSize: 12,
    fontWeight: 500
  },  
  tableCell: { 
    margin: 5, 
    fontSize: 10 
  },
});

const tstyles = StyleSheet.create({
    table: {
        display: "table",
         width: "auto",
    },
    row: {
        flexDirection: "row",
    },
    cell: {
         padding: '3px'
      }
});

const sanitize_block = (block) => {
    //console.log("Block", block, block.length);
    if(block.length === 0){
        block = " ";
    }
    if (typeof(block) === 'string' || typeof(block) === "number") {
        return <Text>{block}</Text>
    } else {
        return block
    }
}


const checkisEmpty = (obj) => {
    for(var key in obj) {
        if(obj.hasOwnProperty(key))
            return false;
    }
    return true;
}



export const Table = ({data,
    style_function=(() => {}),
    style={}, header}) => {

    if(!checkisEmpty(data[0]) || true){
       
        return (
            <Document>
                <Page size="LETTER"  wrap={true} style={styles.body}>
                    <View style={styles.section}>
                        <Text>NPCASC COVID19 Employee Daily Health Alert Report</Text>
                    </View>
                    <View style={styles.section} fixed>
                        <Text>{header}</Text>
                    </View>   

                    <View style={styles.tableRow} fixed> 
                        <View style={styles.tableCol1Header}> 
                            <Text style={styles.tableCellHeader}>ID</Text> 
                        </View> 
                        <View style={styles.tableColTempHeader}> 
                            <Text style={styles.tableCellHeader}>Temp</Text> 
                        </View> 
                        <View style={styles.tableColSymptomHeader}> 
                            <Text style={styles.tableCellHeader}>Symptom</Text> 
                        </View> 
                        <View style={styles.tableColContactHeader}> 
                            <Text style={styles.tableCellHeader}>Contacted</Text> 
                        </View> 
                        <View style={styles.tableColTravelHeader}> 
                            <Text style={styles.tableCellHeader}>Travel</Text> 
                        </View>                         
                        <View style={styles.tableColTestHeader}> 
                            <Text style={styles.tableCellHeader}>Test</Text> 
                        </View> 
                        <View style={styles.tableColTimetHeader}> 
                            <Text style={styles.tableCellHeader}>Log Time</Text> 
                        </View>
                         
                    </View>
                    <View style={styles.page}>
                        {
                            data.map(
                            (row, row_index) =>
                                <View key={row_index} style={tstyles.row}  wrap={false}>
                                                             
                                    {<View key={"1"} style={styles.tableCol1}>
                                        {sanitize_block(row["id"])}
                                    </View>}
                                    
                                    {<View key={"2"} style={styles.tableColTemp}>
                                        {sanitize_block(row["temperature"])}
                                    </View>}
                                    {<View key={"3"} style={styles.tableColSymptom}>
                                        {sanitize_block(row["symptom"])}
                                    </View>}
                                    {<View key={"4"} style={styles.tableColContact}>
                                        {sanitize_block(row["contacted"])}
                                    </View>}
                                    {<View key={"5"} style={styles.tableColTravel}>
                                        {sanitize_block(row["travel"])}
                                    </View>}
                                    {<View key={"6"} style={styles.tableColTest}>
                                        {sanitize_block(row["test"])}
                                    </View>}
                                    {<View key={"7"} style={styles.tableColTime}>
                                        {sanitize_block((row["date"] + "\n" + row["time"]))}
                                    </View>}
                                    
                                    

                                </View>
                            )
                        }
                    </View>
                    
                </Page>
            </Document>
        )
    }
    else{
        return <Document></Document>;
    }
    

}


export const Table1 = ({data,
    style_function=(() => {}),
    style={}, header}) => {

    if(!checkisEmpty(data[0]) || true){
       
        return (
            <Document>
                <Page size="LETTER"  wrap={true} style={styles.body}>
                    <View style={styles.section}>
                        <Text>NPCASC COVID19 Employee Daily Health Alert Report</Text>
                    </View>
                    <View style={styles.section} fixed>
                        <Text>{header}</Text>
                    </View>   

                    <View style={styles.tableRow} fixed> 
                        <View style={styles.tableCol1Header}> 
                            <Text style={styles.tableCellHeader}>ID</Text> 
                        </View> 
                        <View style={styles.tableColHeader}> 
                            <Text style={styles.tableCellHeader}>Status</Text> 
                        </View> 
                        <View style={styles.tableColHeader}> 
                            <Text style={styles.tableCellHeader}>Test Date</Text> 
                        </View> 
                        <View style={styles.tableColHeader}> 
                            <Text style={styles.tableCellHeader}>Log Time</Text> 
                        </View>
                         
                    </View>
                    <View style={styles.page}>
                        {
                            data.map(
                            (row, row_index) =>
                                <View key={row_index} style={tstyles.row}  wrap={false}>
                                                             
                                    {<View key={"1"} style={styles.tableCol1}>
                                        {sanitize_block(row["id"])}
                                    </View>}
                                    
                                    {<View key={"2"} style={styles.tableCol}>
                                        {sanitize_block(row["status"])}
                                    </View>}
                                    {<View key={"3"} style={styles.tableCol}>
                                        {sanitize_block(row["testdate"])}
                                    </View>}
                                    {<View key={"7"} style={styles.tableCol}>
                                        {sanitize_block((row["date"] + "\n" + row["time"]))}
                                    </View>}
                                    
                                    

                                </View>
                            )
                        }
                    </View>
                    
                </Page>
            </Document>
        )
    }
    else{
        return <Document></Document>;
    }
    

}
