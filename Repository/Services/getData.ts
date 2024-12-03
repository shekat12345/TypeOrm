import {useState, useEffect} from 'react';
import {ChatList} from './../Table_Entities/ChatList';
import {Message} from './../Table_Entities/Messages';
import {File} from './../Table_Entities/Files';
import {chatRepository, messageRepository} from '../Factory';
import {DataSourceDb} from './../database.js'
import { ConnectorP } from './Dbconenctor';
type Keyword = 'ChatList' | 'Message' | 'File';

export function useDatabase(keyword: Keyword, options?: any) {
  const [data, setData] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // ConnectorP.RunDb();
    // DataSourceDb.ini
    DataSourceDb.initialize().then(()=>{
        
        chatRepository.findAll().then((e)=>{
            // alert (JSON.stringify(e))
            setData(e);

        })
        
        
    })
    const fetchData = async () => {
        setLoading(true);
        setError(null);
  
        try {
          
  
          const results = []
          const data = await chatRepository.findAll();
          // setData(results);
          alert (JSON.stringify(results))
        } catch (err: any) {
          // alert (err)
          setError(err.message || 'Failed to fetch data');
        } finally {
          setLoading(false);
        }
      };
      
    return () => {
      DataSourceDb.DestroyDb();
    };
   
    
  }, [keyword, options]);

  return {data, loading, error};
}
