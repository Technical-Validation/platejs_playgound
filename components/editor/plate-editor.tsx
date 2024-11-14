'use client';

import React from 'react';
import {DndProvider} from 'react-dnd';
import {HTML5Backend} from 'react-dnd-html5-backend';

import {Plate} from '@udecode/plate-common/react';

import {useCreateEditor} from '@/components/editor/use-create-editor';
import {SettingsDialog} from '@/components/editor/use-chat';
import {Editor, EditorContainer} from '@/components/plate-ui/editor';
import {Button} from "@/components/plate-ui/button";
import {Input} from "@/components/plate-ui/input";
import {TextareaAutosize} from "@udecode/plate-caption/react";

export function PlateEditor() {
    const editor = useCreateEditor();

    const [value, setValue] = React.useState('');
    const [exportValue, setExportValue] = React.useState('');

    const handleInsert = (_value: any) => {
        console.log('insert nodes', _value)
        editor.insertNodes(JSON.parse(_value));
    };

    return (
        <>
            <div>
                <TextareaAutosize className='border min-h-[200px] min-w-[500px]' value={value}
                                  onChange={(e) => setValue(e.target.value)} placeholder='input platejs'/>
                <Button onClick={() => handleInsert(value)}>Insert By Platejs</Button>
            </div>
            <div>
                <Button onClick={() => setExportValue(JSON.stringify(editor.children))}>Export Platejs</Button>
                <TextareaAutosize className='border min-h-[200px] min-w-[500px]' value={exportValue} disabled
                                  placeholder='export platejs'/>
            </div>
            <DndProvider backend={HTML5Backend}>
                <Plate editor={editor}>
                    <EditorContainer>
                        <Editor variant="demo"/>
                    </EditorContainer>

                    <SettingsDialog/>
                </Plate>
            </DndProvider>
        </>
    );
}
