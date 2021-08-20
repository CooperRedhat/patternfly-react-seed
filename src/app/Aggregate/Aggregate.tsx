import * as React from 'react';
import { Card, CardBody, CardTitle, Divider, Flex, FlexItem, Gallery, Grid, GridItem, PageSection, Stack } from '@patternfly/react-core';
import { CheckCircleIcon, ExclamationCircleIcon, ExclamationTriangleIcon, TimesCircleIcon } from '@patternfly/react-icons';
import { css } from '@patternfly/react-styles';
import styles from '@patternfly/react-styles/css/layouts/Flex/flex';
const cardData = {
  iconOnly: [
    {
      title: '5 Clusters',
      content: [
        {
          icon: <CheckCircleIcon color='#3E8635' />
        }
      ],
      layout: 'icon'
    },
    {
      title: '15 Clusters',
      content: [
        {
          icon: <ExclamationTriangleIcon color='#F0AB00' />
        }
      ],
      layout: 'icon'
    },
    {
      title: '3 Clusters',
      content: [
        {
          icon: <TimesCircleIcon color='#C9190B' />
        }
      ],
      layout: 'icon'
    }
  ],
  iconWithCount: [
    {
      title: '10 Hosts',
      content: [
        {
          icon: <ExclamationCircleIcon color='#3E8635' />,
          count: 2
        },
        {
          icon: <ExclamationTriangleIcon color="#F0AB00" />,
          count: 1
        }
      ],
      layout: 'multiIcon'
    },
    {
      title: '50 Hosts',
      content: [
        {
          icon: <CheckCircleIcon color='#3E8635' />,
          count: 5
        },
        {
          icon: <TimesCircleIcon color='#C9190B' />,
          count: 12
        }
      ],
      layout: 'multiIcon'
    },
    {
      title: '12 Hosts',
      content: [
        {
          icon: <ExclamationTriangleIcon color='#F0AB00' />,
          count: 2
        },
        {
          icon: <TimesCircleIcon color='#C9190B' />,
          count: 7
        }
      ],
      layout: 'multiIcon'
    },
  ],
  withSubtitle: [
    {
      title: '13 Hosts',
      content: [
        {
          icon: <TimesCircleIcon color='#C9190B' />,
          status: '2 errors',
          subtitle: 'subtitle'
        },
        {
          icon: <ExclamationTriangleIcon color="#F0AB00" />,
          status: '1 warning',
          subtitle: 'subtitle'
        }
      ],
      layout: 'withSubtitle'
    },
    {
      title: '3 Hosts',
      content: [
        {
          icon: <CheckCircleIcon color='#3E8635' />,
          status: '2 successes',
          subtitle: 'subtitle'
        },
        {
          icon: <ExclamationTriangleIcon color="#F0AB00" />,
          status: '3 warnings',
          subtitle: 'subtitle'
        }
      ],
      layout: 'withSubtitle'
    },
    {
      title: '50 Hosts',
      content: [
        {
          icon: <ExclamationTriangleIcon color='#F0AB00' />,
          status: '7 warnings',
          subtitle: 'subtitle'
        },
        {
          icon: <TimesCircleIcon color='#C9190B' />,
          status: '1 error',
          subtitle: 'subtitle'
        }
      ],
      layout: 'withSubtitle'
    }
  ]
}

const Aggregate: React.FunctionComponent = () => {
  const renderContent = (content, layout) => {
    if (layout === 'icon') {
      return content[0].icon
    }
    if (layout === 'multiIcon') {
      return ( 
        <Flex flex={{ default: 'inlineFlex' }}>
          {content.map(({icon, count}, idx: number) => {
            return (
              <>
                <Flex className={css(styles.modifiers.spaceItemsSm)}>
                  <FlexItem>{icon}</FlexItem>
                  <FlexItem><a href="#">{count}</a></FlexItem>
                </Flex>
                {content.length > 1 && idx === 0 && <Divider isVertical/>}
              </>
            ) 
          })}
      </Flex>
      )
    }
    if (layout === 'withSubtitle') {
      return (
        <Flex flex={{ default: 'justifyContentSpaceAround' }}>
          {content.map(({icon, status, subtitle}) => {
              return (  
                <Flex key={status}>
                  <FlexItem>{icon}</FlexItem>
                  <Stack>
                    <a href="#">{status}</a>
                    <span>{subtitle}</span>
                  </Stack>
                </Flex>
              ) 
           })
          }
        </Flex>
      )
    } 
  }
  return (
      <Grid hasGutter>
        {Object.keys(cardData).map(cardGroup => {
          let galleryWidth, cardAlign, titleAlign;
          if (cardGroup === 'withSubtitle') {
            galleryWidth = '310px';
            cardAlign = '';
            titleAlign = 'center';
          } else {
            cardAlign = 'center';
          }
          return (
            <GridItem key={cardGroup}>
              <Gallery hasGutter style={{'--pf-l-gallery--GridTemplateColumns--min': galleryWidth}}>
                {cardData[cardGroup].map(({title, content, layout}) => (
                  <Card style={{textAlign: cardAlign}} key={title} component='div'>
                    <CardTitle style={{textAlign: titleAlign}} >{title}</CardTitle>
                    <CardBody>
                      {renderContent(content, layout)}
                    </CardBody>
                  </Card>
                ))}
              </Gallery>
            </GridItem>
          )
        })}
        </Grid>
  )
}

export { Aggregate };
