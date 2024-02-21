import EditorJS from '@editorjs/editorjs'
import { useParams, useNavigate, useLocation } from 'react-router-dom';



import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import TextareaAutosize from 'react-textarea-autosize'
import { PostCreationRequest, PostValidator } from '@/lib/validators/post';
import { z } from 'zod'
import { useCallback, useEffect, useRef, useState } from 'react'
// import { toast } from '@/hooks/use-toast'
// import { uploadFiles } from '@/lib/uploadthing'
// import { useMutation } from '@tanstack/react-query'
// import axios from 'axios'

// import '@/styles/editor.css'

type FormData = z.infer<typeof PostValidator>

interface EditorProps {
  subredditId: string
}

// interface IProps {}

const Editor: React.FC<EditorProps> = ({ subredditId }) => {
    const {
        register,
        handleSubmit,
        formState: { errors },
      } = useForm<FormData>({
        resolver: zodResolver(PostValidator),
        defaultValues: {
          subredditId,
          title: '',
          content: null,
        },
      })

      const ref = useRef<EditorJS>()
      const _titleRef = useRef<HTMLTextAreaElement>(null)
    //   const router = useRouter()
      const [isMounted, setIsMounted] = useState<boolean>(false)
      const location = useLocation()
      const pathname = location.pathname

      const initializeEditor = useCallback(async () => {
        const EditorJS = (await import('@editorjs/editorjs')).default
        const Header = (await import('@editorjs/header')).default
        const Embed = (await import('@editorjs/embed')).default
        const Table = (await import('@editorjs/table')).default
        const List = (await import('@editorjs/list')).default
        const Code = (await import('@editorjs/code')).default
        const LinkTool = (await import('@editorjs/link')).default
        const InlineCode = (await import('@editorjs/inline-code')).default
        const ImageTool = (await import('@editorjs/image')).default
    
        if (!ref.current) {
          const editor = new EditorJS({
            holder: 'editor',
            onReady() {
              ref.current = editor
            },
            placeholder: 'Type here to write your post...',
            inlineToolbar: true,
            data: { blocks: [] },
            tools: {
              header: Header,
              linkTool: {
                class: LinkTool,
                config: {
                  endpoint: '/api/link/',
                },
              },
              image: {
                class: ImageTool,
                config: {
                    endpoints: {
                      byFile: '/api/upload-image/',
                      byUrl: '/api/upload-file/',
                    },
                  },
              },
              list: List,
              code: Code,
              inlineCode: InlineCode,
              table: Table,
              embed: Embed,
            },
          })
        }
      }, [])

      useEffect(() => {
        // if (typeof window !== 'undefined') {
          setIsMounted(true)
        // }
      }, [])

    //   useEffect(() => {
    //     if (isMounted) {
    //       initializeEditor();
    //     }
    //     return () => {
    //       ref.current?.destroy();
    //       ref.current = null;
    //     };
    //   }, [isMounted, initializeEditor]);

      useEffect(() => {
        const init = async () => {
          await initializeEditor()
    
          setTimeout(() => {
            _titleRef?.current?.focus()
          }, 0)
        }
    
        if (isMounted) {
          init()
    
          return () => {
            ref.current?.destroy()
            ref.current = undefined
          }
        }
      }, [isMounted, initializeEditor])

    const { ref: titleRef, ...rest } = register('title')

    return (



    <div className='w-full p-4 bg-zinc-50 rounded-lg border border-zinc-200'>
      <form
        id='subreddit-post-form'
        className='w-fit'
        // onSubmit={handleSubmit(onSubmit)}>
        >
          <div className='prose prose-stone dark:prose-invert'>
          <TextareaAutosize
            ref={(e) => {
              titleRef(e)
              // @ts-expect-error stop
              _titleRef.current = e
            }}
            {...rest}
            placeholder='Title'
            className='w-full resize-none appearance-none overflow-hidden bg-transparent text-5xl font-bold focus:outline-none'
          />
            <div id='editor' className='min-h-[500px]' />
          </div>
      </form>
    </div>
  );
};

export default Editor;