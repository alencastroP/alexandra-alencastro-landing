import { useRef } from 'react'
import styled from 'styled-components'
import { Section } from '../ui/Section'
import { Container } from '../ui/Container'
import { Eyebrow, Lead, SectionHead, Title } from '../ui/Heading'
import { OutlineButton, PrimaryAction } from '../ui/Button'
import { Icon } from '../ui/Icon'
import { Reveal } from '../ui/Reveal'
import { useInstagramPosts } from '../../hooks/useInstagramPosts'
import { ease } from '../../styles/animations'
import { bp } from '../../styles/theme'
import { perfil, secoes } from '../../data/content'

const Apoio = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 20px;
`

const Acoes = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
`

/* So as setas somem no celular: la a linha anda com o dedo. O link do
   perfil fica em toda tela. */
const Controles = styled.div`
  display: flex;
  gap: 8px;

  @media (max-width: ${bp.tablet}) {
    display: none;
  }
`

const Seta = styled.button<{ $inverte?: boolean }>`
  display: inline-grid;
  place-items: center;
  width: 44px;
  height: 44px;
  border: 1px solid ${p => p.theme.text};
  border-radius: ${p => p.theme.radius.pill};
  background: transparent;
  color: ${p => p.theme.text};
  cursor: pointer;
  transition: background-color 0.25s ${ease.inOut}, color 0.25s ${ease.inOut};

  svg {
    transform: ${p => (p.$inverte ? 'rotate(180deg)' : 'none')};
  }

  &:hover {
    background: ${p => p.theme.text};
    color: ${p => p.theme.bg};
  }
`

/* A linha sangra para a direita: ela sai do trilho de 1200px e continua
   ate a borda da tela, deixando claro que ha mais post do lado. */
const Trilho = styled.ul`
  display: flex;
  gap: ${p => p.theme.layout.elementGap};
  margin-top: 40px;
  margin-right: calc(-1 * max(24px, (100vw - ${p => p.theme.layout.maxWidth}) / 2));
  padding-right: 24px;
  overflow-x: auto;
  scroll-snap-type: x mandatory;
  scroll-behavior: smooth;
  scrollbar-width: none;

  &::-webkit-scrollbar {
    display: none;
  }

  @media (max-width: ${bp.phone}) {
    margin-right: -16px;
    padding-right: 16px;
  }
`

const Post = styled.li`
  flex: 0 0 clamp(200px, 23vw, 260px);
  scroll-snap-align: start;

  a {
    display: block;
  }

  img {
    width: 100%;
    aspect-ratio: 1;
    object-fit: cover;
    border: 1px solid ${p => p.theme.border};
    border-radius: ${p => p.theme.radius.card};
    background: ${p => p.theme.borderSoft};
    transition: border-color 0.3s ${ease.inOut};
  }

  figcaption {
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    overflow: hidden;
    margin-top: 10px;
    font-size: ${p => p.theme.type.body.size};
    line-height: 1.45;
    color: ${p => p.theme.textMuted};
  }

  a:hover img {
    border-color: ${p => p.theme.textMuted};
  }

  a:hover figcaption {
    color: ${p => p.theme.text};
  }
`

/* Enquanto o feed responde: mesma medida dos posts, so o contorno. */
const Vazio = styled.li`
  flex: 0 0 clamp(200px, 23vw, 260px);
  aspect-ratio: 1;
  border: 1px solid ${p => p.theme.border};
  border-radius: ${p => p.theme.radius.card};
`

/* Sem feed conectado: em vez de card falso, o convite para o perfil. */
const Convite = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 20px;
  margin-top: 40px;
  padding-top: 36px;
  border-top: 1px solid ${p => p.theme.border};
`

const Arroba = styled.a`
  display: block;
  max-width: 100%;
  overflow: hidden;
  font-size: clamp(40px, 9vw, ${p => p.theme.type.hero.size});
  line-height: 1;
  letter-spacing: -0.03em;
  white-space: nowrap;
  color: transparent;
  -webkit-text-stroke: 1px ${p => p.theme.border};
  transition: -webkit-text-stroke-color 0.35s ${ease.inOut};

  &:hover {
    -webkit-text-stroke-color: ${p => p.theme.text};
  }
`

export function Instagram() {
  const { posts, carregando } = useInstagramPosts(8)
  const trilho = useRef<HTMLUListElement>(null)

  const andar = (direcao: 1 | -1) => {
    const linha = trilho.current
    if (!linha) return
    const item = linha.firstElementChild as HTMLElement | null
    const passo = item ? item.offsetWidth + 12 : linha.clientWidth * 0.8
    linha.scrollBy({ left: passo * direcao * 2, behavior: 'smooth' })
  }

  const temLinha = carregando || posts.length > 0

  return (
    <Section id="instagram" aria-labelledby="instagram-titulo">
      <Container>
        <Reveal>
          <SectionHead>
            <div>
              <Eyebrow>{secoes.instagram.rotulo}</Eyebrow>
              <Title id="instagram-titulo">{secoes.instagram.titulo}</Title>
            </div>
            <Apoio>
              <Lead>{secoes.instagram.texto}</Lead>
              <Acoes>
                <OutlineButton
                  as="a"
                  href={perfil.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Icon name="instagram" size={16} />
                  {perfil.instagramUsuario}
                </OutlineButton>
                {temLinha && (
                  <Controles>
                    <Seta
                      type="button"
                      onClick={() => andar(-1)}
                      aria-label="Ver posts anteriores"
                      $inverte
                    >
                      <Icon name="arrowRight" size={18} />
                    </Seta>
                    <Seta type="button" onClick={() => andar(1)} aria-label="Ver mais posts">
                      <Icon name="arrowRight" size={18} />
                    </Seta>
                  </Controles>
                )}
              </Acoes>
            </Apoio>
          </SectionHead>
        </Reveal>

        {temLinha ? (
          <Trilho
            ref={trilho}
            aria-label={`Últimas publicações de ${perfil.instagramUsuario}`}
            aria-busy={carregando || undefined}
          >
            {carregando
              ? Array.from({ length: 6 }, (_, i) => <Vazio key={i} aria-hidden="true" />)
              : posts.map(post => (
                  <Post key={post.id}>
                    <a href={post.link} target="_blank" rel="noopener noreferrer">
                      <figure>
                        <img src={post.imagem} alt={post.alt} loading="lazy" decoding="async" />
                        {post.legenda && <figcaption>{post.legenda}</figcaption>}
                      </figure>
                    </a>
                  </Post>
                ))}
          </Trilho>
        ) : (
          <Reveal delay={0.1}>
            <Convite>
              <Arroba href={perfil.instagram} target="_blank" rel="noopener noreferrer">
                {perfil.instagramUsuario}
              </Arroba>
              <p>{secoes.instagram.convite}</p>
              <PrimaryAction href={perfil.instagram}>{secoes.instagram.cta}</PrimaryAction>
            </Convite>
          </Reveal>
        )}
      </Container>
    </Section>
  )
}
